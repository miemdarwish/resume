"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import { profile } from "@/lib/resume-data"

export function HeroSection() {
  const t = useTranslations()

  return (
    <section id="home" className="scroll-mt-20 min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 bg-[#F8F0F0] flex items-center justify-center px-5 py-12 sm:px-8 lg:p-16">
        <div className="max-w-xl">
          <p className="mb-4 text-base text-muted-foreground sm:text-lg">{t.hero.greeting}</p>
          <h1 className="mb-6 text-5xl font-bold leading-[0.95] text-primary sm:text-6xl lg:text-8xl">
            Miriam
            <br />
            Darwish
          </h1>
          <p className="inline-flex rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/80 shadow-sm">
            {profile.tagline}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-8">
            <Link
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Email
            </Link>
            <Link
              href="/cv/miriam-darwish-cv.pdf"
              target="_blank"
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {t.hero.downloadCV}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-5 py-12 sm:px-8 lg:p-16">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-56 w-56 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
            <Image
              src="/images/miriam-profile.jpg"
              alt="Miriam Darwish - PMO Consultant"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-foreground/60">{profile.role}</p>
          <p className="mt-2 text-xs text-foreground/40">{profile.yearsOfExperience}</p>
        </div>
      </div>
    </section>
  )
}
