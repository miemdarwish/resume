"use client"

import { useState } from "react"
import { Linkedin, Mail, MapPin, Menu, Phone, X } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SidebarSearch } from "@/components/resume/sidebar-search"
import { profile, profileLinks, totalPages } from "@/lib/resume-data"

const navItems = ["home", "services", "resume", "skills", "contact"] as const

interface SidebarProps {
  activeSection: string
  currentPage: number
  onNavClick: (sectionId: string) => void
}

export function Sidebar({ activeSection, currentPage, onNavClick }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations()

  const isNavItem = (id: string): id is (typeof navItems)[number] => navItems.includes(id as (typeof navItems)[number])

  const handleNavClick = (id: string) => {
    onNavClick(id)
    setMenuOpen(false)
  }

  const handleSearchSelect = (sectionId: string) => {
    if (!isNavItem(sectionId)) {
      return
    }
    handleNavClick(sectionId)
  }

  const getNavLabel = (id: (typeof navItems)[number]) => t.nav[id]

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-80 flex-col justify-between bg-sidebar p-8 lg:flex">
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center justify-between">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-sidebar-foreground" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <LanguageSwitcher variant="light" />
          </div>

          <div className="mb-3 flex items-center gap-2 text-sm text-sidebar-foreground/70">
            <span className="font-bold text-sidebar-foreground">{String(currentPage).padStart(2, "0")}</span>
            <div className="h-px w-16 bg-sidebar-foreground/50" />
            <span>{String(totalPages).padStart(2, "0")}</span>
          </div>

          <div className="mb-4">
            <SidebarSearch inputId="sidebar-search" onSelectSection={handleSearchSelect} />
          </div>

          <div className="relative flex-1 overflow-y-auto pr-1">
            <div className={`transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-sidebar-foreground/70" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.name}</span>
                    <p className="font-medium text-sidebar-foreground">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-sidebar-foreground/70" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.role}</span>
                    <p className="font-medium text-sidebar-foreground">{t.hero.role}</p>
                  </div>
                </div>
                <div className="min-w-0 flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-none text-sidebar-foreground/70" />
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.email}</span>
                    <a href={profileLinks.email} className="block break-all font-medium text-sidebar-foreground transition-colors hover:text-sidebar-foreground/80">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-none text-sidebar-foreground/70" />
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.phone}</span>
                    <a href={profileLinks.phone} className="block font-medium text-sidebar-foreground transition-colors hover:text-sidebar-foreground/80">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute inset-0 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`block text-left text-2xl font-bold transition-colors ${
                      activeSection === item
                        ? "text-sidebar-foreground underline underline-offset-4"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                    }`}
                  >
                    {getNavLabel(item)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-4 shrink-0">
            <div className="text-3xl text-sidebar-foreground/80" style={{ fontFamily: "var(--font-signature)" }}>
              {profile.name}
            </div>

            <div className="mt-6 flex items-end gap-4">
              <div className="text-[7rem] leading-none font-bold text-sidebar-foreground/30">{String(currentPage).padStart(2, "0")}</div>
              <div className="mb-6 h-8 w-8 rounded-full border-2 border-sidebar-foreground/30" />
            </div>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-sidebar-foreground/10 bg-sidebar/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-sidebar-foreground" aria-label="Toggle menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
              <span className="font-bold text-sidebar-foreground">{String(currentPage).padStart(2, "0")}</span>
              <div className="h-px w-8 bg-sidebar-foreground/50" />
              <span>{String(totalPages).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="min-w-0 flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <span className="hidden truncate font-bold text-sidebar-foreground min-[380px]:block">{profile.name}</span>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-sidebar px-6 pb-8 pt-20 lg:hidden">
          <div>
            <div className="mb-8 flex items-center gap-2 text-sm text-sidebar-foreground/70">
              <span className="font-bold text-sidebar-foreground">{String(currentPage).padStart(2, "0")}</span>
              <div className="h-px w-16 bg-sidebar-foreground/50" />
              <span>{String(totalPages).padStart(2, "0")}</span>
            </div>

            <div className="mb-4">
              <SidebarSearch inputId="mobile-sidebar-search" onSelectSection={handleSearchSelect} />
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`block text-left text-2xl font-bold transition-colors ${
                    activeSection === item
                      ? "text-sidebar-foreground underline underline-offset-4"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  }`}
                >
                  {getNavLabel(item)}
                </button>
              ))}
            </nav>

            <div className="mt-12 space-y-6 text-sidebar-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.contact.address}</span>
                  <p className="font-medium text-sidebar-foreground">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.phone}</span>
                  <a href={profileLinks.phone} className="block font-medium text-sidebar-foreground transition-colors hover:text-sidebar-foreground/80">
                    {profile.phone}
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex items-start gap-3">
                <Mail className="h-5 w-5" />
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.sidebar.email}</span>
                  <a href={profileLinks.email} className="block break-all font-medium text-sidebar-foreground transition-colors hover:text-sidebar-foreground/80">
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex items-start gap-3">
                <Linkedin className="h-5 w-5" />
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-widest text-sidebar-foreground/70">{t.contact.linkedin}</span>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all font-medium text-sidebar-foreground transition-colors hover:text-sidebar-foreground/80"
                  >
                    {profile.linkedinLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 text-2xl text-sidebar-foreground/80" style={{ fontFamily: "var(--font-signature)" }}>
              {profile.name}
            </div>
            <div className="flex items-end gap-4">
              <div className="text-[5rem] leading-none font-bold text-sidebar-foreground/30">{String(currentPage).padStart(2, "0")}</div>
              <div className="mb-4 h-6 w-6 rounded-full border-2 border-sidebar-foreground/30" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
