"use client"

import { useEffect, useRef } from "react"
import clarity from "@microsoft/clarity"

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim()

export function ClarityInit() {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current || !clarityProjectId) {
      return
    }

    clarity.init(clarityProjectId)
    hasInitialized.current = true
  }, [])

  return null
}