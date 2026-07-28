import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware replacements for `next/link` and `next/navigation`. Import these
 * instead of the Next originals so internal hrefs stay written as `/about` and
 * get the active locale prefix applied automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
