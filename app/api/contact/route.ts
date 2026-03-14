import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"
import { profile } from "@/lib/resume-data"

const CONTACT_ERROR_CODES = [
  "nameRequired",
  "nameTooLong",
  "emailInvalid",
  "emailTooLong",
  "subjectRequired",
  "subjectTooLong",
  "messageRequired",
  "messageTooLong",
  "recaptchaFailed",
  "recaptchaNotConfigured",
  "emailServiceNotConfigured",
  "smtpAuthDisabled",
  "smtpInvalidCredentials",
  "sendFailed",
  "formInvalid",
] as const

type ContactErrorCode = (typeof CONTACT_ERROR_CODES)[number]

function isContactErrorCode(value: string): value is ContactErrorCode {
  return CONTACT_ERROR_CODES.includes(value as ContactErrorCode)
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").max(120, "nameTooLong"),
  email: z.string().trim().email("emailInvalid").max(160, "emailTooLong"),
  subject: z.string().trim().min(1, "subjectRequired").max(160, "subjectTooLong"),
  message: z.string().trim().min(1, "messageRequired").max(4000, "messageTooLong"),
  recaptchaToken: z
    .string({ required_error: "recaptchaFailed" })
    .trim()
    .min(1, "recaptchaFailed"),
})

const recaptchaVerificationSchema = z.object({
  success: z.boolean(),
  score: z.number().optional(),
  action: z.string().optional(),
})

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.office365.com"
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER?.trim()
  const smtpPass = process.env.SMTP_PASS?.trim()
  const contactTo = process.env.CONTACT_TO?.trim() || smtpUser
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.trim()

  if (!smtpUser || !smtpPass || !contactTo) {
    return NextResponse.json({ errorCode: "emailServiceNotConfigured" satisfies ContactErrorCode }, { status: 500 })
  }

  if (!recaptchaSecret) {
    return NextResponse.json({ errorCode: "recaptchaNotConfigured" satisfies ContactErrorCode }, { status: 500 })
  }

  try {
    const payload = contactSchema.parse(await request.json())
    const isRecaptchaValid = await verifyRecaptchaToken(payload.recaptchaToken, recaptchaSecret)

    if (!isRecaptchaValid) {
      return NextResponse.json({ errorCode: "recaptchaFailed" satisfies ContactErrorCode }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"${profile.name} Website" <${smtpUser}>`,
      to: contactTo,
      replyTo: `${payload.name} <${payload.email}>`,
      subject: `Resume contact: ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]
      const errorCode = firstIssue && isContactErrorCode(firstIssue.message) ? firstIssue.message : "formInvalid"
      return NextResponse.json({ errorCode }, { status: 400 })
    }

    console.error("Contact email failed:", error)
    if (error instanceof Error && /smtpclientauthentication is disabled|5\.7\.139/i.test(error.message)) {
      return NextResponse.json({ errorCode: "smtpAuthDisabled" satisfies ContactErrorCode }, { status: 500 })
    }

    if (error instanceof Error && /badcredentials|username and password not accepted|invalid login|5\.7\.8/i.test(error.message)) {
      return NextResponse.json({ errorCode: "smtpInvalidCredentials" satisfies ContactErrorCode }, { status: 500 })
    }

    return NextResponse.json({ errorCode: "sendFailed" satisfies ContactErrorCode }, { status: 500 })
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

async function verifyRecaptchaToken(token: string, secret: string) {
  const body = new URLSearchParams({
    secret,
    response: token,
  })

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    })

    if (!response.ok) {
      return false
    }

    const verification = recaptchaVerificationSchema.safeParse(await response.json())

    if (!verification.success) {
      return false
    }

    return (
      verification.data.success &&
      verification.data.action === "contact_form_submit" &&
      typeof verification.data.score === "number" &&
      verification.data.score >= 0.5
    )
  } catch {
    return false
  }
}
