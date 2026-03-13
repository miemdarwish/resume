"use client"

import { useState } from "react"
import { useTranslations } from "@/lib/i18n/context"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { cn } from "@/lib/utils"

interface ExperienceSectionProps {
  currentPage?: number
}

export function ExperienceSection({ currentPage = 4 }: ExperienceSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const t = useTranslations()

  return (
    <section id="resume" className="scroll-mt-20 min-h-screen bg-background px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-12 text-3xl font-bold text-primary">{t.experience.title}</h2>

            <Timeline size="md">
              {t.experience.items.map((exp, index) => {
                const isSelected = selectedIndex === index
                const isHovered = hoveredIndex === index
                const isFilled = isSelected || isHovered

                return (
                  <TimelineItem
                    key={`${exp.company}-${exp.period}`}
                    date={exp.year}
                    iconsize="sm"
                    tone={isFilled ? "active" : "muted"}
                    showLeadingConnector={index > 0}
                    showConnector={index < t.experience.items.length - 1}
                    className="cursor-pointer"
                    contentClassName={cn(
                      "rounded-3xl border p-5 transition-colors sm:p-6",
                      isFilled ? "border-primary/40 bg-card" : "border-border/60 bg-card/40",
                    )}
                    timeClassName={isFilled ? "text-primary" : "text-primary/60"}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                    <h3 className={`mt-1 font-semibold transition-colors ${isFilled ? "text-foreground" : "text-foreground/80"}`}>
                      {exp.title}
                    </h3>
                    <p className="mb-4 text-sm text-primary">{exp.company}</p>
                    <ul className={`space-y-2 text-sm leading-relaxed transition-all ${isFilled ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="mt-2 block h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                )
              })}
            </Timeline>
          </div>

          <div className="lg:col-span-1">
            <h2 className="mb-6 text-3xl font-bold text-primary">{t.experience.coverLetter}</h2>
            <div className="rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8">
              {t.experience.summaryParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "mb-6 text-base leading-relaxed text-foreground/80 sm:text-lg" : "mb-6 leading-relaxed text-muted-foreground last:mb-0"}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="text-6xl font-bold text-primary/20 sm:text-8xl lg:text-9xl">{String(currentPage).padStart(2, "0")}</div>
        </div>
      </div>
    </section>
  )
}
