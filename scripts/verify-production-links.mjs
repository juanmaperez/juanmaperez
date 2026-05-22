#!/usr/bin/env node
/**
 * Story 9.3 / FR21 — verify internal links on a live (or preview) origin.
 * CI runs `npm run test:links` on site/dist before deploy; this script checks the
 * same href targets over HTTP after deploy.
 *
 * Usage:
 *   BASE=https://juanmaperez.dev node scripts/verify-production-links.mjs
 *   BASE=http://127.0.0.1:4321 node scripts/verify-production-links.mjs   # after npm run preview
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.env.BASE ?? 'https://juanmaperez.dev').replace(/\/$/, '');

const DEFAULT_SEEDS = [
	'/',
	'/cv/',
	'/blog/',
	'/blog/how-javascript-engine-works',
	'/projects/umaicha',
	'/404',
];

const ATTR_RE = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;

function loadRedirectSources() {
	try {
		const content = fs.readFileSync(
			path.join(repoRoot, 'site/src/config/redirects.ts'),
			'utf8',
		);
		return new Set(
			[...content.matchAll(/^\s*['"](\/[^'"]+)['"]\s*:/gm)].map((m) => m[1]),
		);
	} catch {
		return new Set(['/projects/colossus']);
	}
}

function isInternalUrl(url) {
	if (!url || url.startsWith('#')) return false;
	if (/^(?:mailto:|tel:|javascript:|data:)/i.test(url)) return false;
	if (url.startsWith('//')) return false;
	if (/^https?:/i.test(url)) return false;
	return url.startsWith('/');
}

function normalizePath(url) {
	const withoutQuery = url.split(/[?#]/)[0];
	if (!withoutQuery || withoutQuery === '/') return '/';
	return withoutQuery.endsWith('/') && withoutQuery.length > 1
		? withoutQuery.slice(0, -1)
		: withoutQuery;
}

async function fetchHtml(urlPath) {
	const url = `${BASE}${urlPath.startsWith('/') ? urlPath : `/${urlPath}`}`;
	const res = await fetch(url, { redirect: 'follow' });
	if (!res.ok) {
		throw new Error(`${urlPath} seed fetch ${res.status}`);
	}
	return res.text();
}

async function checkTarget(urlPath, redirectSources) {
	const normalized = normalizePath(urlPath);
	if (redirectSources.has(normalized) || redirectSources.has(`${normalized}/`)) {
		return { ok: true, status: 'redirect-map' };
	}

	const url = `${BASE}${normalized === '/' ? '/' : normalized}`;
	const res = await fetch(url, { redirect: 'follow' });
	if (res.status >= 200 && res.status < 400) {
		return { ok: true, status: String(res.status) };
	}
	return { ok: false, status: String(res.status) };
}

async function main() {
	const seeds = process.env.SEEDS
		? process.env.SEEDS.split(',').map((s) => s.trim())
		: DEFAULT_SEEDS;
	const redirectSources = loadRedirectSources();
	const toCheck = new Set();
	const failures = [];

	console.log(`FR21 production link check: ${BASE}`);

	for (const seed of seeds) {
		let html;
		try {
			html = await fetchHtml(seed);
		} catch (err) {
			failures.push({ source: `seed:${seed}`, href: seed, detail: err.message });
			continue;
		}
		for (const match of html.matchAll(ATTR_RE)) {
			const raw = match[1].trim();
			if (!isInternalUrl(raw)) continue;
			toCheck.add(normalizePath(raw));
		}
	}

	for (const target of [...toCheck].sort()) {
		const result = await checkTarget(target, redirectSources);
		if (!result.ok) {
			failures.push({
				source: 'crawl',
				href: target,
				detail: `HTTP ${result.status}`,
			});
		}
	}

	if (failures.length > 0) {
		console.error(`Broken internal links (${failures.length}):\n`);
		for (const f of failures) {
			console.error(`  ${f.source} → ${f.href} (${f.detail})`);
		}
		process.exit(1);
	}

	console.log(
		`Internal link integrity OK (live): ${seeds.length} seed page(s), ${toCheck.size} unique internal target(s) checked.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
