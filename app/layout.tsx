import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClarityInit } from '@/components/clarity-init'
import { getExperienceYearsPlus } from '@/lib/experience'
import { profile } from '@/lib/resume-data'
import { withBasePath } from '@/lib/site'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const quetine = localFont({
  src: [
    {
      path: '../public/fonts/quetine/Quetine.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/quetine/Quetine.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-quetine',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim()
const metadataBase = siteUrl ? new URL(siteUrl) : undefined
const experienceYearsPlus = getExperienceYearsPlus()

const seoTitle = 'Miriam Darwish | PMO Consultant Resume in Denmark'
const seoDescription =
  `Explore Miriam Darwish's resume: PMO consultant with ${experienceYearsPlus} years in project coordination, governance, risk management and stakeholder support in Denmark.`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D2424',
}

export const metadata: Metadata = {
  metadataBase,
  title: seoTitle,
  description: seoDescription,
  verification: {
    google: googleSiteVerification,
  },
  applicationName: `${profile.name} Resume`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    'Miriam Darwish',
    'PMO consultant',
    'project coordinator',
    'resume',
    'CV',
    'Denmark',
    'project governance',
    'risk management',
    'stakeholder management',
  ],
  category: 'business',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: seoTitle,
    description: seoDescription,
    siteName: profile.name,
    images: metadataBase
      ? [
          {
            url: '/images/miriam-profile.jpg',
            width: 1200,
            height: 1200,
            alt: `${profile.name} profile photo`,
          },
        ]
      : undefined,
  },
  twitter: {
    card: metadataBase ? 'summary_large_image' : 'summary',
    title: seoTitle,
    description: seoDescription,
    images: metadataBase ? ['/images/miriam-profile.jpg'] : undefined,
  },
  alternates: metadataBase
    ? {
        canonical: '/',
      }
    : undefined,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: withBasePath('/favicon.ico'),
      },
      {
        url: withBasePath('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: withBasePath('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: withBasePath('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: withBasePath('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${quetine.variable} antialiased`}>
        {children}
        <ClarityInit />
        <Analytics />
      </body>
    </html>
  )
}
