"use client"

import { useTranslations } from "@/lib/i18n/context"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-card px-5 py-8 text-center sm:px-8">
      <p className="text-sm text-muted-foreground">Copyright 2026 Miriam Darwish. {t.footer.rights}</p>
      <p className="mt-2 text-xs text-muted-foreground/60">{t.footer.tagline}</p>
    </footer>
  )
}
