#!/usr/bin/env bash
# Story 9.3 — production smoke after GitHub Pages uses Actions deploy from site/dist.
#
# Usage:
#   BASE=https://juanmaperez.dev ./scripts/verify-production-smoke.sh
#   BASE=<github-pages-deploy-url> ./scripts/verify-production-smoke.sh   # when custom DNS not ready
#
# Exit codes: 0 = pass, 1 = smoke failed (bad status/content), 2 = host unreachable (DNS/deploy URL)
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

fetch_code() {
	local url="$1"
	local out
	out="$(curl -sL -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 30 "$url" 2>/dev/null)" || true
	# curl may print nothing on hard failure; treat non-3-digit as unreachable
	if [[ ! "$out" =~ ^[0-9]{3}$ ]]; then
		echo "000"
	else
		echo "$out"
	fi
}

probe_host() {
	[[ "$(fetch_code "$BASE/")" != "000" ]]
}

if ! probe_host; then
	echo "SKIP: cannot reach $BASE/ (HTTP 000 — connection/DNS not ready)." >&2
	echo "" >&2
	echo "This is expected if juanmaperez.dev DNS or GitHub Pages custom domain is not configured yet." >&2
	echo "Use phase B from docs/deployment-guide.md § Cutover verification:" >&2
	echo "  1. cd site && npm run build && npm run test:links   # FR21 on dist (CI artifact)" >&2
	echo "  2. BASE=<deploy-job-page_url> $0   # live smoke on actual Pages URL" >&2
	echo "  3. Re-run with BASE=https://juanmaperez.dev when DNS is live" >&2
	exit 2
fi

fail=0
echo "Production smoke: $BASE"
echo "path	status	astro_marker	title"
for path in "${paths[@]}"; do
	url="$BASE$path"
	tmp="$(mktemp)"
	code="$(fetch_code "$url")"
	astro="no"
	if grep -q '/_astro/' "$tmp" 2>/dev/null; then
		astro="yes"
	fi
	title=""
	if grep -q '<title>' "$tmp" 2>/dev/null; then
		title="$(grep -o '<title>[^<]*</title>' "$tmp" | head -1 | sed 's/<[^>]*>//g')"
	fi
	rm -f "$tmp"
	if [[ "$code" == "000" ]]; then
		echo "Host became unreachable during crawl. Check DNS or BASE." >&2
		exit 2
	fi
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

# FR21 — internal links on the same origin (optional skip: VERIFY_LINKS=0)
if [[ "${VERIFY_LINKS:-1}" != "0" ]]; then
	echo ""
	SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
	BASE="$BASE" node "$SCRIPT_DIR/verify-production-links.mjs"
fi
