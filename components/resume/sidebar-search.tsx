"use client"

import { useEffect, useMemo, useState } from "react"
import { InstantSearch, useHits, useSearchBox } from "react-instantsearch"
import { Search, X } from "lucide-react"
import { useTranslations } from "@/lib/i18n/context"
import {
  buildResumeSearchRecords,
  createResumeSearchClient,
  RESUME_SEARCH_INDEX,
  type ResumeSearchHit,
} from "@/lib/search/resume-search"

interface SidebarSearchProps {
  inputId: string
  onSelectSection: (sectionId: string) => void
}

const HIGHLIGHT_ATTR = "data-resume-search-highlight"

function getTopOffset() {
  const fixedHeader = document.querySelector("header.fixed.top-0")
  const headerHeight = fixedHeader instanceof HTMLElement ? fixedHeader.offsetHeight : 0
  return headerHeight + 12
}

function scrollToFirstHighlight(section: HTMLElement) {
  const firstHighlight = section.querySelector(`mark[${HIGHLIGHT_ATTR}]`)
  if (!(firstHighlight instanceof HTMLElement)) {
    return
  }

  const offset = getTopOffset()
  const rect = firstHighlight.getBoundingClientRect()
  const isVisible = rect.top >= offset && rect.bottom <= window.innerHeight

  if (isVisible) {
    return
  }

  const targetY = firstHighlight.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({
    top: Math.max(targetY, 0),
    behavior: "smooth",
  })
}

function clearSectionHighlights() {
  const marks = document.querySelectorAll(`mark[${HIGHLIGHT_ATTR}]`)
  marks.forEach((mark) => {
    const parent = mark.parentNode
    if (!parent) {
      return
    }

    parent.replaceChild(document.createTextNode(mark.textContent ?? ""), mark)
    parent.normalize()
  })
}

function buildHighlightRegex(query: string) {
  const terms = query
    .trim()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean)

  if (!terms.length) {
    return null
  }

  return new RegExp(`(${terms.map(escapeRegex).join("|")})`, "gi")
}

function highlightInSection(sectionId: string, query: string) {
  const section = document.getElementById(sectionId)
  if (!section) {
    return
  }

  clearSectionHighlights()
  const regex = buildHighlightRegex(query)

  if (!regex) {
    return
  }

  const textNodes: Text[] = []
  const walker = document.createTreeWalker(
    section,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement
        if (!parent) {
          return NodeFilter.FILTER_REJECT
        }

        const tag = parent.tagName
        if (["SCRIPT", "STYLE", "NOSCRIPT", "MARK"].includes(tag)) {
          return NodeFilter.FILTER_REJECT
        }

        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT
        }

        return NodeFilter.FILTER_ACCEPT
      },
    },
  )

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text)
  }

  textNodes.forEach((node) => {
    const text = node.textContent ?? ""
    regex.lastIndex = 0
    let match = regex.exec(text)

    if (!match) {
      return
    }

    const fragment = document.createDocumentFragment()
    let cursor = 0

    while (match) {
      const start = match.index
      const end = start + match[0].length

      if (start > cursor) {
        fragment.appendChild(document.createTextNode(text.slice(cursor, start)))
      }

      const mark = document.createElement("mark")
      mark.setAttribute(HIGHLIGHT_ATTR, "true")
      mark.className = "bg-primary/55 px-1 font-semibold text-foreground"
      mark.textContent = text.slice(start, end)
      fragment.appendChild(mark)

      cursor = end
      match = regex.exec(text)
    }

    if (cursor < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(cursor)))
    }

    node.parentNode?.replaceChild(fragment, node)
  })

  window.requestAnimationFrame(() => {
    scrollToFirstHighlight(section)
  })
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const terms = query
    .trim()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean)

  if (!terms.length || !text) {
    return <>{text}</>
  }

  const regex = new RegExp(`(${terms.map(escapeRegex).join("|")})`, "gi")
  const termSet = new Set(terms.map((term) => term.toLowerCase()))

  return (
    <>
      {text.split(regex).map((part, idx) => {
        if (termSet.has(part.toLowerCase())) {
          return (
            <mark key={`${part}-${idx}`} className="bg-primary/45 px-0.5 font-semibold text-sidebar-foreground">
              {part}
            </mark>
          )
        }

        return <span key={`${part}-${idx}`}>{part}</span>
      })}
    </>
  )
}

function SidebarSearchContent({ inputId, onSelectSection }: SidebarSearchProps) {
  const t = useTranslations()
  const { query, refine } = useSearchBox()
  const { hits } = useHits<ResumeSearchHit>()
  const [focused, setFocused] = useState(false)
  const [enterHitIndex, setEnterHitIndex] = useState(0)
  const trimmedQuery = query.trim()
  const hasQuery = trimmedQuery.length > 0
  const showSuggestions = focused && hasQuery
  const topHits = hits.slice(0, 6)

  useEffect(() => {
    if (!hasQuery) {
      clearSectionHighlights()
    }
  }, [hasQuery])

  useEffect(() => {
    setEnterHitIndex(0)
  }, [trimmedQuery, topHits.length])

  const selectHit = (hit: ResumeSearchHit) => {
    const currentQuery = trimmedQuery
    onSelectSection(hit.sectionId)
    window.setTimeout(() => {
      highlightInSection(hit.sectionId, currentQuery)
    }, 450)
    setFocused(false)
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="mb-2 block text-xs uppercase tracking-widest text-sidebar-foreground/70">
        {t.sidebar.searchLabel}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/60" />
        <input
          id={inputId}
          value={query}
          onChange={(event) => {
            const nextQuery = event.currentTarget.value
            refine(nextQuery)
            setEnterHitIndex(0)
            if (!nextQuery.trim()) {
              clearSectionHighlights()
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setFocused(false), 120)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && topHits.length > 0) {
              event.preventDefault()
              const index = enterHitIndex % topHits.length
              selectHit(topHits[index])
              setEnterHitIndex((index + 1) % topHits.length)
            }
          }}
          placeholder={t.sidebar.searchPlaceholder}
          aria-label={t.sidebar.searchAriaLabel}
          autoComplete="off"
          className="h-10 w-full border border-sidebar-foreground/25 bg-sidebar/70 pl-9 pr-10 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/60 focus:border-sidebar-foreground/50 focus:outline-none"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => {
              refine("")
              setEnterHitIndex(0)
              clearSectionHighlights()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
            aria-label={t.sidebar.clearSearchAriaLabel}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-1 text-[11px] text-sidebar-foreground/65">{t.sidebar.searchHint}</p>

      {showSuggestions && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto border border-sidebar-foreground/20 bg-sidebar/95 p-2 shadow-lg backdrop-blur-sm">
          {topHits.length > 0 ? (
            <ul className="space-y-1">
              {topHits.map((hit) => (
                <li key={hit.objectID}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectHit(hit)}
                    className="w-full px-3 py-2 text-left transition-colors hover:bg-sidebar-foreground/10"
                  >
                    <div className="text-xs uppercase tracking-widest text-sidebar-foreground/65">{hit.sectionLabel}</div>
                    <div className="mt-1 text-sm font-medium text-sidebar-foreground">
                      <HighlightText text={hit.title} query={trimmedQuery} />
                    </div>
                    <div className="mt-1 line-clamp-2 text-xs text-sidebar-foreground/75">
                      <HighlightText text={hit.snippet} query={trimmedQuery} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-sm text-sidebar-foreground/70">{t.sidebar.noSuggestions}</p>
          )}
        </div>
      )}
    </div>
  )
}

export function SidebarSearch({ inputId, onSelectSection }: SidebarSearchProps) {
  const t = useTranslations()

  const records = useMemo(() => buildResumeSearchRecords(t), [t])
  const searchClient = useMemo(() => createResumeSearchClient(records), [records])

  return (
    <InstantSearch indexName={RESUME_SEARCH_INDEX} searchClient={searchClient as any}>
      <SidebarSearchContent inputId={inputId} onSelectSection={onSelectSection} />
    </InstantSearch>
  )
}
