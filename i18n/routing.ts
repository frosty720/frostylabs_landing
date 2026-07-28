import { defineRouting } from 'next-intl/routing';
import { SUPPORTED_LOCALES } from '@/lib/const';

/** Single source of truth stays `SUPPORTED_LOCALES` so the switcher can't drift. */
export const locales = SUPPORTED_LOCALES.map((l) => l.code);

export const defaultLocale = 'en';

export const routing = defineRouting({
	locales,
	defaultLocale,
	/**
	 * `as-needed` keeps English on its bare URLs (`/`, `/about`, `/blog/...`).
	 * Switching to `always` would 301 every English page to `/en/...`, discarding
	 * the ranking history those URLs already have.
	 */
	localePrefix: 'as-needed',
});
