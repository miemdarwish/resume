"use client"

import { BarChart3, Briefcase, Coins, FolderKanban, Shield, Users } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import { areasOfExpertise, profile } from "@/lib/resume-data"

const expertiseIcons = [FolderKanban, Shield, Users, Coins, Briefcase, BarChart3] as const

interface ServicesSectionProps {
  currentPage?: number
}

export function ServicesSection({ currentPage = 2 }: ServicesSectionProps) {
  const t = useTranslations()

  return (
    <section id="services" className="scroll-mt-20 min-h-screen bg-card px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:col-span-2">
            {areasOfExpertise.map((service, index) => {
              const Icon = expertiseIcons[index]
              return (
                <div key={service.title} className="rounded-3xl border border-border/60 bg-secondary/50 p-6 transition-colors hover:bg-secondary sm:p-8">
                  <Icon className="mb-6 h-12 w-12 text-primary stroke-1" />
                  <h3 className="mb-4 text-xl font-semibold text-primary">{service.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="lg:col-span-1">
            <h2 className="mb-6 text-3xl font-bold text-primary">{t.services.title}</h2>
            <p className="mb-6 text-base leading-relaxed text-foreground/80 sm:text-lg">{profile.summary}</p>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              The PDF CV centers the profile around hands-on PMO support, structured coordination, strong reporting discipline, and proactive governance across international project environments.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Core tools include Microsoft Office, Confluence, SharePoint, MS Project, Jira, Oracle P2P, and ServiceNow.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="/cv/miriam-darwish-cv.pdf"
                target="_blank"
                className="rounded-full bg-primary px-6 py-3 text-center font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Download CV
              </a>
              <a
                href="#resume"
                className="rounded-full border border-primary px-6 py-3 text-center font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View Experience
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
        <div className="text-6xl font-bold text-primary/20 sm:text-8xl lg:text-9xl">{String(currentPage).padStart(2, "0")}</div>
      </div>
    </section>
  )
}
