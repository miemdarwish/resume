"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import { profile, profileLinks } from "@/lib/resume-data"

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
  "recaptchaLoadFailed",
  "recaptchaNotConfigured",
  "emailServiceNotConfigured",
  "smtpAuthDisabled",
  "sendFailed",
  "formInvalid",
] as const

type ContactErrorCode = (typeof CONTACT_ERROR_CODES)[number]

function isContactErrorCode(value: string): value is ContactErrorCode {
  return CONTACT_ERROR_CODES.includes(value as ContactErrorCode)
}

type RecaptchaClient = {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaClient
  }
}

async function getRecaptchaToken(siteKey: string) {
  const timeoutAt = Date.now() + 10_000

  while (!window.grecaptcha) {
    if (Date.now() > timeoutAt) {
      throw new Error("recaptchaLoadFailed")
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha?.execute(siteKey, { action: "contact_form_submit" })

        if (!token) {
          reject(new Error("recaptchaFailed"))
          return
        }

        resolve(token)
      } catch {
        reject(new Error("recaptchaFailed"))
      }
    })
  })
}

async function getRuntimeRecaptchaSiteKey() {
  try {
    const response = await fetch("/api/recaptcha/site-key", {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      return ""
    }

    const data = (await response.json()) as { siteKey?: string }
    return String(data.siteKey || "").trim()
  } catch {
    return ""
  }
}

interface ContactSectionProps {
  currentPage?: number
}

export function ContactSection({ currentPage = 6 }: ContactSectionProps) {
  const t = useTranslations()
  const isStaticSite = process.env.NEXT_PUBLIC_STATIC_SITE === "true"
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState(() => process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{
    type: "idle" | "success" | "error"
    message: string
  }>({
    type: "idle",
    message: "",
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const getContactErrorMessage = (errorCode: ContactErrorCode) => {
    switch (errorCode) {
      case "nameRequired":
        return t.contact.form.errors.nameRequired
      case "nameTooLong":
        return t.contact.form.errors.nameTooLong
      case "emailInvalid":
        return t.contact.form.errors.emailInvalid
      case "emailTooLong":
        return t.contact.form.errors.emailTooLong
      case "subjectRequired":
        return t.contact.form.errors.subjectRequired
      case "subjectTooLong":
        return t.contact.form.errors.subjectTooLong
      case "messageRequired":
        return t.contact.form.errors.messageRequired
      case "messageTooLong":
        return t.contact.form.errors.messageTooLong
      case "recaptchaFailed":
        return t.contact.form.errors.recaptchaFailed
      case "recaptchaLoadFailed":
        return t.contact.form.errors.recaptchaLoadFailed
      case "recaptchaNotConfigured":
        return t.contact.form.errors.recaptchaNotConfigured
      case "emailServiceNotConfigured":
        return t.contact.form.errors.emailServiceNotConfigured
      case "smtpAuthDisabled":
        return t.contact.form.errors.smtpAuthDisabled
      case "sendFailed":
        return t.contact.form.errors.sendFailed
      case "formInvalid":
        return t.contact.form.errors.formInvalid
      default:
        return t.contact.form.error
    }
  }

  useEffect(() => {
    if (isStaticSite || recaptchaSiteKey) {
      return
    }

    let isCancelled = false

    const loadRecaptchaSiteKey = async () => {
      const runtimeKey = await getRuntimeRecaptchaSiteKey()

      if (!isCancelled && runtimeKey) {
        setRecaptchaSiteKey(runtimeKey)
      }
    }

    void loadRecaptchaSiteKey()

    return () => {
      isCancelled = true
    }
  }, [isStaticSite, recaptchaSiteKey])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submittedForm = e.currentTarget
    const submittedValues = new FormData(submittedForm)
    const payload = {
      name: String(submittedValues.get("name") || "").trim(),
      email: String(submittedValues.get("email") || "").trim(),
      subject: String(submittedValues.get("subject") || "").trim(),
      message: String(submittedValues.get("message") || "").trim(),
    }

    if (isStaticSite) {
      const subject = encodeURIComponent(payload.subject)
      const body = encodeURIComponent(
        [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          "",
          payload.message,
        ].join("\n"),
      )

      window.location.href = `${profileLinks.email}?subject=${subject}&body=${body}`
      setSubmitState({
        type: "success",
        message: t.contact.form.mailClient,
      })
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitState({ type: "idle", message: "" })

      const siteKey = recaptchaSiteKey || (await getRuntimeRecaptchaSiteKey())

      if (!siteKey) {
        throw new Error("recaptchaNotConfigured")
      }

      if (siteKey !== recaptchaSiteKey) {
        setRecaptchaSiteKey(siteKey)
      }

      const recaptchaToken = await getRecaptchaToken(siteKey)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          recaptchaToken,
        }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string; errorCode?: string }

      if (!response.ok) {
        throw new Error(data.errorCode || data.error || "sendFailed")
      }

      setSubmitState({
        type: "success",
        message: t.contact.form.success,
      })
      submittedForm.reset()
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      let message: string = t.contact.form.error

      if (error instanceof Error) {
        const rawMessage = error.message.trim()
        if (rawMessage && isContactErrorCode(rawMessage)) {
          message = getContactErrorMessage(rawMessage)
        } else if (rawMessage) {
          message = rawMessage
        }
      }

      setSubmitState({
        type: "error",
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {!isStaticSite && recaptchaSiteKey && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      )}

      <section id="contact" className="scroll-mt-20 min-h-screen bg-background px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-primary">{t.contact.title}</h2>
              <p className="mb-8 text-base leading-relaxed text-foreground/80 sm:text-lg">{t.contact.description}</p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-xs uppercase tracking-widest text-foreground/50">{t.contact.address}:</span>
                    <p className="text-foreground">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-widest text-foreground/50">{t.contact.email}:</span>
                    <a href={profileLinks.email} className="block break-all text-foreground transition-colors hover:text-primary">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-xs uppercase tracking-widest text-foreground/50">{t.contact.phone}:</span>
                    <a href={profileLinks.phone} className="block text-foreground transition-colors hover:text-primary">
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-widest text-foreground/50">{t.contact.linkedin}:</span>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block break-all text-foreground transition-colors hover:text-primary"
                    >
                      {profile.linkedinLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-primary p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    maxLength={120}
                    placeholder={t.contact.form.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border-b border-primary-foreground/30 bg-transparent pb-3 text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    maxLength={160}
                    placeholder={t.contact.form.email}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full border-b border-primary-foreground/30 bg-transparent pb-3 text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    maxLength={160}
                    placeholder={t.contact.form.subject}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full border-b border-primary-foreground/30 bg-transparent pb-3 text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    maxLength={4000}
                    placeholder={t.contact.form.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full resize-none border-b border-primary-foreground/30 bg-transparent pb-3 text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border-2 border-primary-foreground py-4 font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                </button>

                <p className="text-xs leading-relaxed text-primary-foreground/80">
                  {t.contact.form.recaptchaNotice.prefix}{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {t.contact.form.recaptchaNotice.privacy}
                  </a>{" "}
                  {t.contact.form.recaptchaNotice.and}{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {t.contact.form.recaptchaNotice.terms}
                  </a>{" "}
                  {t.contact.form.recaptchaNotice.suffix}
                </p>

                {submitState.type !== "idle" && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                      submitState.type === "success"
                        ? "border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground"
                        : "border-primary-foreground/30 bg-black/10 text-primary-foreground"
                    }`}
                  >
                    {submitState.message}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <div className="text-6xl font-bold text-primary/20 sm:text-8xl lg:text-9xl">{String(currentPage).padStart(2, "0")}</div>
          </div>
        </div>
      </section>
    </>
  )
}
