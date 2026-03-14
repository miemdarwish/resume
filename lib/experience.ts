import { getExperienceYearsFrom, getExperienceYearsPlusFrom } from "./experience-core"
import { EXPERIENCE_START } from "./i18n/translations"

export function getExperienceYears(now = new Date()) {
  return getExperienceYearsFrom(EXPERIENCE_START, now)
}

export function getExperienceYearsPlus(now = new Date()) {
  return getExperienceYearsPlusFrom(EXPERIENCE_START, now)
}
