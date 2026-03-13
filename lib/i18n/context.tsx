"use client"

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react"
import { translations, Locale, TranslationKeys } from "./translations"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationKeys
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)
const STORAGE_KEY = "resume-locale"

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY)
    if (storedLocale === "en" || storedLocale === "nl" || storedLocale === "da") {
      setLocale(storedLocale)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export function useTranslations() {
  const { t } = useI18n()
  return t
}
