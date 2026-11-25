import { countryByCode, countryByTimeZone } from '@/data/regions';

/**
 * Best guess of the visitor's country, or "" if unknown.
 * The time zone is checked first because many people keep their language set to "en-US".
 * Nothing is sent anywhere and no permission is needed.
 */
export function detectCountry() {
  try {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    if (countryByTimeZone[timeZone]) return countryByTimeZone[timeZone];
    const region = navigator.language?.match(/-([A-Z]{2})\b/i)?.[1];
    return countryByCode[region?.toUpperCase()] || '';
  } catch (e) {
    return '';
  }
}
