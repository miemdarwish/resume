"use client"

import { useEffect, useRef, useState } from "react"
import {
  Database,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  LayoutGrid,
  Mail,
  Network,
  Presentation,
  Server,
  Users,
  Wrench,
} from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"

const groupIcons = {
  "Microsoft Office": FileSpreadsheet,
  Collaboration: Users,
  "Project Management": FolderKanban,
  Enterprise: Server,
  Samenwerking: Users,
  Projectmanagement: FolderKanban,
  Projektledelse: FolderKanban,
  Samarbejde: Users,
} as const

const toolIcons = {
  Excel: FileSpreadsheet,
  Outlook: Mail,
  Word: FileText,
  "Power Point": Presentation,
  Visio: Network,
  Confluence: LayoutGrid,
  SharePoint: FolderKanban,
  "MS Project": FolderKanban,
  Jira: LayoutGrid,
  ServiceNow: Wrench,
  "Oracle P2P": Database,
} as const

function CircularProgress({ percentage, name, isVisible }: { percentage: number; name: string; isVisible: boolean }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    if (isVisible) {
      const duration = 1500
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(easeOut * percentage)
        setAnimatedPercentage(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    } else {
      setAnimatedPercentage(0)
    }
  }, [isVisible, percentage])

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28 sm:h-36 sm:w-36">
        <svg viewBox="0 0 144 144" className="h-full w-full -rotate-90 transform">
          <circle cx="72" cy="72" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-primary sm:text-2xl">{animatedPercentage}%</span>
        </div>
      </div>
      <span className="mt-4 text-center text-sm text-muted-foreground sm:text-base">{name}</span>
    </div>
  )
}

function ProgressBar({ percentage, name, isVisible }: { percentage: number; name: string; isVisible: boolean }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const duration = 1500
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(easeOut * percentage)
        setAnimatedPercentage(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    } else {
      setAnimatedPercentage(0)
    }
  }, [isVisible, percentage])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground">{name}</span>
        <span className="text-muted-foreground">{animatedPercentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-none" style={{ width: `${animatedPercentage}%` }} />
      </div>
    </div>
  )
}

interface SkillsSectionProps {
  currentPage?: number
}

export function SkillsSection({ currentPage = 5 }: SkillsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="scroll-mt-20 min-h-screen bg-card px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold text-primary">{t.skills.title}</h2>

        <div className="mb-16 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {t.skills.circular.map((skill) => (
            <CircularProgress key={skill.name} percentage={skill.percentage} name={skill.name} isVisible={isVisible} />
          ))}
        </div>

        <div className="mb-16 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {t.skills.bars.map((skill) => (
            <ProgressBar key={skill.name} percentage={skill.percentage} name={skill.name} isVisible={isVisible} />
          ))}
        </div>

        <div className="mb-16">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.technologies}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {t.skills.technologyGroups.map((group) => {
              const GroupIcon = groupIcons[group.category as keyof typeof groupIcons] ?? Server
              return (
                <div key={group.category} className="rounded-xl border border-border/50 bg-secondary/30 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <GroupIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{group.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => {
                      const ToolIcon = toolIcons[tool as keyof typeof toolIcons] ?? Server
                      return (
                        <div
                          key={tool}
                          className="flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                        >
                          <ToolIcon className="h-4 w-4" />
                          <span>{tool}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.personalSkills}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {t.skills.personalSkillsList.map((skill) => (
              <div key={skill} className="rounded-lg bg-secondary/50 px-4 py-3 text-foreground/80">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.languages}</h3>
          <div className="flex flex-wrap gap-4">
            {t.skills.languagesList.map((language) => (
              <span key={language} className="rounded-full bg-primary/20 px-6 py-2 font-medium text-primary">
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.certifications}</h3>
          <div className="flex flex-wrap gap-4">
            {t.skills.certificationsList.map((certification) => (
              <div key={certification.name} className="inline-block rounded-lg bg-secondary/50 p-6">
                <p className="font-medium text-foreground">{certification.name}</p>
                <p className="text-sm text-muted-foreground">{certification.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.education}</h3>
          <div className="rounded-lg bg-secondary/50 p-6">
            <p className="font-medium text-foreground">{t.skills.educationItem.degree}</p>
            <p className="text-sm text-primary">{t.skills.educationItem.school}</p>
            <p className="text-sm text-muted-foreground">{t.skills.educationItem.year}</p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-semibold text-primary">{t.skills.internships}</h3>
          <div className="grid gap-4">
            {t.skills.internshipsList.map((internship) => (
              <div key={internship} className="rounded-lg bg-secondary/50 px-4 py-4 text-foreground/80">
                {internship}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="text-6xl font-bold text-primary/20 sm:text-8xl lg:text-9xl">{String(currentPage).padStart(2, "0")}</div>
        </div>
      </div>
    </section>
  )
}
