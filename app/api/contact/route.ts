import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"
import { profile } from "@/lib/resume-data"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
})

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.office365.com"
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER?.trim()
  const smtpPass = process.env.SMTP_PASS?.trim()
  const contactTo = process.env.CONTACT_TO?.trim() || smtpUser

  if (!smtpUser || !smtpPass || !contactTo) {
    return NextResponse.json(
      { error: "Email service is not configured. Add SMTP_USER, SMTP_PASS, and CONTACT_TO in .env." },
      { status: 500 },
    )
  }

  try {
    const payload = contactSchema.parse(await request.json())

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
      return NextResponse.json({ error: "Please complete all contact form fields correctly." }, { status: 400 })
    }

    console.error("Contact email failed:", error)
    return NextResponse.json({ error: "Unable to send your message right now. Please try again later." }, { status: 500 })
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
