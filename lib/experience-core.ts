export type ExperienceStart = {
  year: number
  month: number
}

const MONTHS_IN_YEAR = 12

function getElapsedMonths(start: ExperienceStart, now: Date) {
  const startMonthIndex = start.month - 1
  const startMonthCount = start.year * MONTHS_IN_YEAR + startMonthIndex
  const nowMonthCount = now.getUTCFullYear() * MONTHS_IN_YEAR + now.getUTCMonth()

  return Math.max(0, nowMonthCount - startMonthCount)
}

export function getExperienceYearsFrom(start: ExperienceStart, now = new Date()) {
  return Math.floor(getElapsedMonths(start, now) / MONTHS_IN_YEAR)
}

export function getExperienceYearsPlusFrom(start: ExperienceStart, now = new Date()) {
  return `${getExperienceYearsFrom(start, now)}+`
}