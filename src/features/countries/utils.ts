import { COUNTRY_COORDINATES } from "@/features/countries/constants"

export function getCountryInfo(countryCode: string) {
  return COUNTRY_COORDINATES.find((c) => c.alpha2 === countryCode)
}
