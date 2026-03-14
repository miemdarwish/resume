import { NextResponse } from "next/server"

export async function GET() {
  const siteKey = process.env.RECAPTCHA_SITE_KEY?.trim() || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || ""

  return NextResponse.json(
    {
      siteKey,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}