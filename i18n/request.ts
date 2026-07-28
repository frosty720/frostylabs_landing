import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

let defaultMessages: Record<string, unknown> | undefined;

export default getRequestConfig(async ({ requestLocale }) => {
	// The locale now comes from the `[locale]` URL segment the middleware matched,
	// not from a cookie — that's what gives each language its own indexable URL.
	const requested = await requestLocale;
	const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
		? (requested as string)
		: routing.defaultLocale;

	if (!defaultMessages) {
		defaultMessages = (await import('../messages/en.json')).default;
	}

	let messages = defaultMessages;

	// Fall back to English per-key so a missing translation renders text, not a key.
	if (locale !== routing.defaultLocale) {
		try {
			const localeMessages = (await import(`../messages/${locale}.json`)).default;
			messages = { ...defaultMessages, ...localeMessages };
		} catch {
			console.warn(`Failed to load messages for locale: ${locale}, using English`);
		}
	}

	return {
		locale,
		messages,
		getMessageFallback({ key, namespace }) {
			return `${namespace}.${key}`;
		},
	};
});
