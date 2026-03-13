"use client"

import { useI18n } from "@/lib/i18n/context"
import { Locale } from "@/lib/i18n/translations"

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
  { code: "da", label: "DA" },
]

interface LanguageSwitcherProps {
  variant?: "light" | "dark"
}

export function LanguageSwitcher({ variant = "dark" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()

  const baseClasses = variant === "light" ? "text-sidebar-foreground/70 hover:text-sidebar-foreground" : "text-muted-foreground hover:text-foreground"

  const activeClasses = variant === "light" ? "text-sidebar-foreground font-bold" : "text-primary font-bold"

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLocale(lang.code)}
            className={`cursor-pointer text-sm transition-colors ${locale === lang.code ? activeClasses : baseClasses}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className={`mx-1 ${variant === "light" ? "text-sidebar-foreground/50" : "text-muted-foreground/50"}`}>|</span>
          )}
        </span>
      ))}
    </div>
  )
}
