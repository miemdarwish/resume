"use client"

import { useState } from "react"
import { Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import { profile, profileLinks } from "@/lib/resume-data"

interface ContactSectionProps {
  currentPage?: number
}

export function ContactSection({ currentPage = 6 }: ContactSectionProps) {
  const t = useTranslations()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setSubmitState({ type: "idle", message: "" })
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok) {
        throw new Error(data.error || t.contact.form.error)
      }

      setSubmitState({
        type: "success",
        message: t.contact.form.success,
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      const message = error instanceof Error ? error.message : t.contact.form.error
      setSubmitState({
        type: "error",
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
                  placeholder={t.contact.form.subject}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full border-b border-primary-foreground/30 bg-transparent pb-3 text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                />
              </div>
              <div>
                <textarea
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
  )
}
