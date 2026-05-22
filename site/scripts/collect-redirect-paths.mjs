/**
 * Lists active redirect map entries (FR12 audit helper).
 * Run from site/: node scripts/collect-redirect-paths.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = fileURLToPath(new URL('../', import.meta.url));
const PATH_RE = /^path:\s*['"]([^'"]+)['"]/m;

const HUB_CANONICAL_PATHS = [
	'/blog',
	'/cv',
	'/blog/category/javascript',
	'/blog/category/react',
	'/blog/category/recipes',
];

function pathsFromContent(relativeDir) {
	const dir = path.join(SITE_ROOT, 'src/content', relativeDir);
	const paths = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const folder = path.join(dir, entry.name);
		for (const md of fs.readdirSync(folder).filter((n) => /\.mdx?$/.test(n))) {
			const match = PATH_RE.exec(fs.readFileSync(path.join(folder, md), 'utf8'));
			if (match) paths.push(match[1]);
		}
	}
	return paths;
}

const map = {
	'/projects/colossus': { status: 301, destination: '/projects/colossus-bets' },
};

const entries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
console.log(`Active redirect entries: ${entries.length}`);
console.log(
	`Canonical paths (no trailing-slash redirect — Astro page conflict): ${
		HUB_CANONICAL_PATHS.length +
		pathsFromContent('posts').length +
		pathsFromContent('projects').length
	}\n`,
);
for (const [from, to] of entries) {
	console.log(`${to.status}\t${from}\t→\t${to.destination}`);
}
