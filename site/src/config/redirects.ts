import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const PATH_RE = /^path:\s*['"]([^'"]+)['"]/m;

/** Hub and category routes (audit / future redirects). */
export const HUB_CANONICAL_PATHS = [
	'/blog',
	'/cv',
	'/blog/category/javascript',
	'/blog/category/react',
	'/blog/category/recipes',
] as const;

type RedirectEntry =
	| string
	| { status: 301 | 302 | 303 | 307 | 308; destination: string };

function pathsFromContent(relativeDir: string): string[] {
	const dir = path.join(SITE_ROOT, 'src/content', relativeDir);
	const paths: string[] = [];

	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const mdFiles = fs
			.readdirSync(path.join(dir, entry.name))
			.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));
		for (const md of mdFiles) {
			const content = fs.readFileSync(path.join(dir, entry.name, md), 'utf8');
			const match = PATH_RE.exec(content);
			if (match) paths.push(match[1]);
		}
	}

	return paths;
}

/** Canonical indexable paths (content `path` + hubs). Used for audits; not all have redirects. */
export function collectCanonicalPaths(): string[] {
	return [
		...HUB_CANONICAL_PATHS,
		...pathsFromContent('posts'),
		...pathsFromContent('projects'),
	];
}

/**
 * FR12 — version-controlled redirect map (keys = source paths, no domain).
 *
 * Trailing-slash → non-trailing aliases are **not** emitted: Astro static routes are
 * `canonical/index.html`, so redirecting `canonical/` conflicts with the prerendered page
 * (build fails, e.g. `/blog/` vs `src/pages/blog/index.astro`). Sitemap may list trailing-slash
 * URLs; post/project canonicals use non-trailing `path` frontmatter (Story 6.1).
 */
export function buildRedirectMap(): Record<string, RedirectEntry> {
	return {
		'/projects/colossus': {
			status: 301,
			destination: '/projects/colossus-bets',
		},
	};
}

export const redirectMap = buildRedirectMap();

/** Redirect source paths that resolve to built redirect pages (FR21 link checker). */
export const redirectSources = Object.keys(redirectMap);
