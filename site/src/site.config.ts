// Single source of truth for site-wide title, description, and canonical origin.
// Keep narrow — only fields BaseLayout (and future SEO components) need.
export const siteConfig = {
	title: 'Juanma Perez',
	description:
		"I'm a web developer creating blazing fast websites and apps from scratch",
	// Canonical production origin. Must match astro.config.mjs `site`.
	origin: 'https://juanmaperez.dev',
} as const;

export type SiteConfig = typeof siteConfig;
