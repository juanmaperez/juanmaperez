// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin (matches legacy gatsby-config.js siteMetadata.siteUrl).
// GitHub Pages: custom domain at site root → base '/'. For https://<user>.github.io/<repo>/ use base: '/<repo>/'.
// @see https://docs.astro.build/en/guides/deploy/github/
export default defineConfig({
	site: 'https://juanmaperez.dev',
	base: '/',
	output: 'static',
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404') && !page.endsWith('/404/'),
		}),
	],
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'github-light',
			wrap: true,
		},
	},
});
