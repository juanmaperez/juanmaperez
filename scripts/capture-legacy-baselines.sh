#!/usr/bin/env bash
# Optional Lighthouse capture for NFR-P1 / NFR-P2 when you have REACHABLE URLs.
# Legacy production (juanmaperez.dev) is out of scope — this script does not default to a dead host.
set -euo pipefail

if [[ -z "${BASELINE_BASE_URL:-}" || -z "${BASELINE_POST_URL:-}" ]]; then
	echo "Legacy web baselines against the old production host are out of scope (site no longer live)." >&2
	echo "To capture against a real URL (e.g. new GitHub Pages origin or http://127.0.0.1:PORT for a local build), set:" >&2
	echo "  BASELINE_BASE_URL   (e.g. https://your-user.github.io/your-repo/)" >&2
	echo "  BASELINE_POST_URL   (full URL to one blog post)" >&2
	exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
SHA="$(git rev-parse --short HEAD)"
DATE="$(date -u +%Y-%m-%d)"
HOME_URL="${BASELINE_BASE_URL%/}/"
OUT_HOME="_baseline/capture-home-${DATE}-${SHA}.json"
OUT_POST="_baseline/capture-post-${DATE}-${SHA}.json"

mkdir -p _baseline

run_lh() {
	local url="$1"
	local out="$2"
	echo "Lighthouse: $url -> $out"
	npx -y lighthouse@12.8.2 "$url" \
		--form-factor=mobile \
		--only-categories=performance \
		--chrome-flags="--headless=new --no-sandbox --disable-gpu --ignore-certificate-errors" \
		--output=json \
		--output-path="$out"
}

run_lh "$HOME_URL" "$OUT_HOME"
run_lh "${BASELINE_POST_URL}" "$OUT_POST"

SUMMARY="_baseline/summary-${DATE}-${SHA}.md"
cat >"$SUMMARY" <<EOF
# Baseline capture summary

- **Date (UTC):** ${DATE}
- **Git SHA:** ${SHA}
- **Home URL:** ${HOME_URL}
- **Post URL:** ${BASELINE_POST_URL}
- **Home JSON:** \`${OUT_HOME}\`
- **Post JSON:** \`${OUT_POST}\`
EOF

echo "Wrote $SUMMARY"
echo "Done."
