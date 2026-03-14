import type { MetadataRoute } from 'next'

const DEFAULT_SITE_URL = 'https://miriamdarwish.vercel.app'

function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return value.replace(/\/+$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}