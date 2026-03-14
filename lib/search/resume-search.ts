import { MeiliSearch } from "meilisearch"
import { profile } from "@/lib/resume-data"
import type { TranslationKeys } from "@/lib/i18n/translations"

export const RESUME_SEARCH_INDEX = process.env.NEXT_PUBLIC_MEILISEARCH_INDEX ?? "resume"

export interface ResumeSearchHit {
  objectID: string
  sectionId: string
  sectionLabel: string
  title: string
  content: string
  snippet: string
  rank: number
}

interface InstantSearchRequest {
  indexName: string
  params?: {
    query?: string
    page?: number
    hitsPerPage?: number
  }
}

interface InstantSearchResult {
  hits: ResumeSearchHit[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  processingTimeMS: number
  exhaustiveNbHits: boolean
  query: string
  params: string
}

function normalizeForSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

function makeSnippet(content: string, query: string, maxLength = 120) {
  if (!content) {
    return ""
  }

  const lowerQuery = query.toLowerCase()
  const lowerContent = content.toLowerCase()
  const matchIndex = lowerContent.indexOf(lowerQuery)

  if (matchIndex < 0) {
    return content.length > maxLength ? `${content.slice(0, maxLength - 1)}…` : content
  }

  const start = Math.max(matchIndex - Math.floor(maxLength / 3), 0)
  const end = Math.min(start + maxLength, content.length)
  const prefix = start > 0 ? "…" : ""
  const suffix = end < content.length ? "…" : ""
  return `${prefix}${content.slice(start, end).trim()}${suffix}`
}

function createParamsString(query: string, page: number, hitsPerPage: number) {
  return new URLSearchParams({
    query,
    page: String(page),
    hitsPerPage: String(hitsPerPage),
  }).toString()
}

function toSearchableText(lines: Array<string | undefined>) {
  return lines.filter(Boolean).join(" ")
}

export function buildResumeSearchRecords(t: TranslationKeys): ResumeSearchHit[] {
  const records: ResumeSearchHit[] = []
  let count = 0

  const addRecord = (sectionId: string, sectionLabel: string, title: string, content: string, rank: number) => {
    records.push({
      objectID: `${sectionId}-${count}`,
      sectionId,
      sectionLabel,
      title,
      content,
      snippet: content,
      rank,
    })
    count += 1
  }

  addRecord("home", t.nav.home, profile.name, toSearchableText([t.hero.greeting, t.hero.role, t.hero.tagline, t.hero.summary]), 20)

  addRecord(
    "services",
    t.nav.services,
    t.services.title,
    toSearchableText([
      t.services.intro,
      t.services.body1,
      t.services.body2,
      ...t.services.cards.flatMap((card) => [card.title, card.description]),
    ]),
    18,
  )

  addRecord("resume", t.nav.resume, t.experience.title, toSearchableText([...t.experience.summaryParagraphs]), 17)
  t.experience.items.forEach((item) => {
    addRecord(
      "resume",
      t.nav.resume,
      `${item.title} • ${item.company}`,
      toSearchableText([item.period, ...item.highlights]),
      14,
    )
  })

  addRecord(
    "skills",
    t.nav.skills,
    t.skills.title,
    toSearchableText([
      t.skills.technologies,
      t.skills.personalSkills,
      t.skills.languages,
      t.skills.certifications,
      t.skills.education,
      t.skills.internships,
      ...t.skills.circular.map((skill) => skill.name),
      ...t.skills.bars.map((skill) => skill.name),
      ...t.skills.technologyGroups.flatMap((group) => [group.category, ...group.tools]),
      ...t.skills.personalSkillsList,
      ...t.skills.languagesList,
      ...t.skills.certificationsList.flatMap((item) => [item.name, item.issuer]),
      t.skills.educationItem.degree,
      t.skills.educationItem.school,
      t.skills.educationItem.year,
      ...t.skills.internshipsList,
    ]),
    16,
  )

  addRecord(
    "contact",
    t.nav.contact,
    t.contact.title,
    toSearchableText([
      t.contact.description,
      profile.location,
      profile.email,
      profile.phone,
      profile.linkedinLabel,
      t.contact.form.name,
      t.contact.form.email,
      t.contact.form.subject,
      t.contact.form.message,
    ]),
    15,
  )

  return records
}

function getLocalSearchResults(records: ResumeSearchHit[], query: string, page: number, hitsPerPage: number): InstantSearchResult {
  const tokens = normalizeForSearch(query).split(/\s+/).filter(Boolean)

  const scored = records
    .map((record) => {
      const title = normalizeForSearch(record.title)
      const content = normalizeForSearch(record.content)

      let score = record.rank
      let matches = 0

      tokens.forEach((token) => {
        if (title.includes(token)) {
          score += 6
          matches += 1
        }
        if (content.includes(token)) {
          score += 3
          matches += 1
        }
      })

      if (matches === 0) {
        return null
      }

      return {
        ...record,
        score,
        snippet: makeSnippet(record.content, query),
      }
    })
    .filter((record): record is ResumeSearchHit & { score: number } => Boolean(record))
    .sort((a, b) => b.score - a.score)

  const offset = page * hitsPerPage
  const hits = scored.slice(offset, offset + hitsPerPage).map(({ score, ...hit }) => hit)
  const nbHits = scored.length
  const nbPages = hitsPerPage > 0 ? Math.ceil(nbHits / hitsPerPage) : 0

  return {
    hits,
    nbHits,
    page,
    nbPages,
    hitsPerPage,
    processingTimeMS: 1,
    exhaustiveNbHits: true,
    query,
    params: createParamsString(query, page, hitsPerPage),
  }
}

export function createResumeSearchClient(records: ResumeSearchHit[]) {
  const meiliHost = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
  const meiliApiKey = process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY
  const meiliClient = meiliHost ? new MeiliSearch({ host: meiliHost, apiKey: meiliApiKey }) : null

  return {
    async search(requests: InstantSearchRequest[]) {
      const results = await Promise.all(
        requests.map(async (request) => {
          const query = `${request.params?.query ?? ""}`.trim()
          const page = Number(request.params?.page ?? 0)
          const hitsPerPage = Number(request.params?.hitsPerPage ?? 6)

          if (!query) {
            return {
              hits: [],
              nbHits: 0,
              page,
              nbPages: 0,
              hitsPerPage,
              processingTimeMS: 0,
              exhaustiveNbHits: true,
              query,
              params: createParamsString(query, page, hitsPerPage),
            }
          }

          if (meiliClient && request.indexName === RESUME_SEARCH_INDEX) {
            try {
              const index = meiliClient.index(RESUME_SEARCH_INDEX)
              const response = await index.search<Record<string, unknown>>(query, {
                limit: hitsPerPage,
                offset: page * hitsPerPage,
              })

              const hits: ResumeSearchHit[] = response.hits.map((hit, idx) => {
                const title = String(hit.title ?? hit.sectionLabel ?? "Result")
                const content = String(hit.content ?? "")
                return {
                  objectID: String(hit.objectID ?? hit.id ?? `${page}-${idx}`),
                  sectionId: String(hit.sectionId ?? ""),
                  sectionLabel: String(hit.sectionLabel ?? "Result"),
                  title,
                  content,
                  snippet: String(hit.snippet ?? makeSnippet(content || title, query)),
                  rank: Number(hit.rank ?? 0),
                }
              })

              const nbHits = response.estimatedTotalHits ?? hits.length
              const nbPages = hitsPerPage > 0 ? Math.ceil(nbHits / hitsPerPage) : 0

              return {
                hits,
                nbHits,
                page,
                nbPages,
                hitsPerPage,
                processingTimeMS: response.processingTimeMs ?? 1,
                exhaustiveNbHits: true,
                query,
                params: createParamsString(query, page, hitsPerPage),
              }
            } catch {
              return getLocalSearchResults(records, query, page, hitsPerPage)
            }
          }

          return getLocalSearchResults(records, query, page, hitsPerPage)
        }),
      )

      return { results }
    },
  }
}
