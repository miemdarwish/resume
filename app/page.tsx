"use client"

import { useState, useEffect } from "react"
import { I18nProvider } from "@/lib/i18n/context"
import { Sidebar } from "@/components/resume/sidebar"
import { HeroSection } from "@/components/resume/hero-section"
import { ServicesSection } from "@/components/resume/services-section"
import { ExperienceSection } from "@/components/resume/experience-section"
import { SkillsSection } from "@/components/resume/skills-section"
import { ContactSection } from "@/components/resume/contact-section"
import { Footer } from "@/components/resume/footer"
import { sectionPages } from "@/lib/resume-data"

const sections = Object.entries(sectionPages).map(([id, page]) => ({ id, page }))

function ResumeContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            setCurrentPage(section.page)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setCurrentPage(sectionPages[sectionId as keyof typeof sectionPages])
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} currentPage={currentPage} onNavClick={handleNavClick} />

      <main className="pt-16 lg:ml-80 lg:pt-0">
        <HeroSection />
        <ServicesSection currentPage={2} />
        <ExperienceSection currentPage={4} />
        <SkillsSection currentPage={5} />
        <ContactSection currentPage={6} />
        <Footer />
      </main>
    </div>
  )
}

export default function ResumePage() {
  return (
    <I18nProvider>
      <ResumeContent />
    </I18nProvider>
  )
}
