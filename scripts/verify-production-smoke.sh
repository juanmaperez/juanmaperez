#!/usr/bin/env bash
# Story 9.3 — production smoke after GitHub Pages uses Actions deploy from site/dist.
# Usage: BASE=https://juanmaperez.dev ./scripts/verify-production-smoke.sh
set -euo pipefail

BASE="${BASE:-https://juanmaperez.dev}"
BASE="${BASE%/}"

paths=(
	/
	/cv/
	/blog/
	/blog/how-javascript-engine-works
	/projects/umaicha
)

fail=0
echo "Production smoke: $BASE"
echo "path	status	astro_marker	title"
for path in "${paths[@]}"; do
	url="$BASE$path"
	tmp="$(mktemp)"
	code="$(curl -sL -o "$tmp" -w "%{http_code}" "$url" || echo "000")"
	astro="no"
	if grep -q '/_astro/' "$tmp" 2>/dev/null; then
		astro="yes"
	fi
	title=""
	if grep -q '<title>' "$tmp" 2>/dev/null; then
		title="$(grep -o '<title>[^<]*</title>' "$tmp" | head -1 | sed 's/<[^>]*>//g')"
	fi
	rm -f "$tmp"
	if [[ "$code" != "200" ]]; then
		fail=1
	fi
	if [[ "$astro" != "yes" ]]; then
		fail=1
	fi
	printf '%s	%s	%s	%s\n' "$path" "$code" "$astro" "$title"
done

if [[ "$fail" -ne 0 ]]; then
	echo "FAIL: one or more routes did not return 200 with Astro /_astro/ assets." >&2
	exit 1
fi
echo "OK: all routes returned 200 with Astro markers."
