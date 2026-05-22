import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(siteRoot, 'dist');

const REDIRECT_SOURCES = ['/projects/colossus'];

const ATTR_RE = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;

function loadRedirectSources() {
	try {
		const redirectsPath = path.join(siteRoot, 'src/config/redirects.ts');
		const content = fs.readFileSync(redirectsPath, 'utf8');
		const keys = [...content.matchAll(/^\s*['"](\/[^'"]+)['"]\s*:/gm)].map((m) => m[1]);
		return keys.length > 0 ? keys : REDIRECT_SOURCES;
	} catch {
		return REDIRECT_SOURCES;
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

function hasAssetExtension(urlPath) {
	return /\.[a-zA-Z0-9]{2,5}$/.test(urlPath);
}

function resolveDistFile(urlPath) {
	const normalized = normalizePath(urlPath);
	const candidates = [];

	if (normalized === '/') {
		candidates.push(path.join(distRoot, 'index.html'));
	} else {
		const rel = normalized.slice(1);
		if (hasAssetExtension(normalized)) {
			candidates.push(path.join(distRoot, rel));
		} else {
			candidates.push(path.join(distRoot, rel, 'index.html'));
			candidates.push(path.join(distRoot, `${rel}.html`));
		}
	}

	return candidates.find((file) => fs.existsSync(file));
}

function walkHtmlFiles(dir, files = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtmlFiles(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function checkLinks() {
	if (!fs.existsSync(distRoot)) {
		console.error('dist/ not found. Run: npm run build');
		process.exit(1);
	}

	const redirectSources = new Set(loadRedirectSources());
	const failures = [];

	for (const htmlFile of walkHtmlFiles(distRoot)) {
		const content = fs.readFileSync(htmlFile, 'utf8');
		const relSource = path.relative(distRoot, htmlFile);

		for (const match of content.matchAll(ATTR_RE)) {
			const raw = match[1].trim();
			if (!isInternalUrl(raw)) continue;

			const urlPath = normalizePath(raw);
			if (redirectSources.has(urlPath) || redirectSources.has(`${urlPath}/`)) {
				continue;
			}

			if (!resolveDistFile(urlPath)) {
				failures.push({ source: relSource, href: raw });
			}
		}
	}

	if (failures.length === 0) {
		console.log(
			`Internal link integrity OK: ${walkHtmlFiles(distRoot).length} HTML file(s) checked.`,
		);
		return;
	}

	console.error(`Broken internal links (${failures.length}):\n`);
	for (const { source, href } of failures) {
		console.error(`  ${source} → ${href}`);
	}
	process.exit(1);
}

checkLinks();
