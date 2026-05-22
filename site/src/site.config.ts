// Single source of truth for site-wide title, description, origin, nav, and contact.
// Keep narrow — only fields BaseLayout, SiteHeader, SiteFooter, and future SEO consumers need.
export const siteConfig = {
	title: 'Juanma Perez',
	description:
		"I'm a web developer creating blazing fast websites and apps from scratch",
	// Canonical production origin. Must match astro.config.mjs `site`.
	origin: 'https://juanmaperez.dev',
	contact: {
		email: 'juanmaperezvar@gmail.com',
		navLabel: 'Contact',
	},
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'CV', href: '/cv' },
		// TODO(4.1): /blog route
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: 'mailto:juanmaperezvar@gmail.com' },
	],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavItem = (typeof siteConfig.nav)[number];
export type ContactConfig = (typeof siteConfig)['contact'];
