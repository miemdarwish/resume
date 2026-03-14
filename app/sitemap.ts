import type { MetadataRoute } from 'next'

const DEFAULT_SITE_URL = 'https://miriamdarwish.vercel.app'

function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return value.replace(/\/+$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}