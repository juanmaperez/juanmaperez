import { siteConfig } from '../site.config';

export function formatPageTitle(pageTitle: string): string {
	const site = siteConfig.title;
	if (!pageTitle || pageTitle === site) return site;
	if (pageTitle.startsWith(`${site} |`)) return pageTitle;
	return `${pageTitle} | ${site}`;
}

export function canonicalUrl(pathname: string): string {
	const base = siteConfig.origin.replace(/\/$/, '');
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return `${base}${path}`;
}

export function truncateDescription(text: string, max = 160): string {
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).trimEnd()}…`;
}
