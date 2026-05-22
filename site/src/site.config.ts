// Single source of truth for site-wide title, description, origin, and primary nav.
// Keep narrow — only fields BaseLayout, SiteHeader, and future SEO/contact consumers need.
export const siteConfig = {
	title: 'Juanma Perez',
	description:
		"I'm a web developer creating blazing fast websites and apps from scratch",
	// Canonical production origin. Must match astro.config.mjs `site`.
	origin: 'https://juanmaperez.dev',
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'CV', href: '/cv' },
		// TODO(4.1): /blog route
		{ label: 'Blog', href: '/blog' },
	],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavItem = (typeof siteConfig.nav)[number];
