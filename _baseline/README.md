# Performance baselines (NFR-P1, NFR-P2)

## Status: legacy production baselines **out of scope**

The previous public host (**`juanmaperez.dev`**) is **no longer live**, so **pre-migration Lighthouse baselines against that production** cannot be captured and are **not required** for this repo going forward.

**NFR-P1 / NFR-P2** (see [PRD](../_bmad-output/planning-artifacts/prd.md) and [architecture §13](../_bmad-output/planning-artifacts/architecture.md)) should be met by:

1. **Establishing a new baseline** the first time the **replacement** site (e.g. Astro on GitHub Pages) is reachable at its **real** production URL, using a **documented** Lighthouse setup; then  
2. **Comparing** later releases to that baseline (same tool, `--form-factor=mobile`, same throttling class unless you intentionally start a new series).

Keep this folder for **future** `legacy-*.json` or **`post-cutover-*.json`** artifacts and a short procedure note when you run captures.

---

## Reference: metrics in Lighthouse JSON (when you do capture)

| Metric | PRD / use | JSON path |
|--------|-----------|-------------|
| **LCP** | NFR-P1 | `audits["largest-contentful-paint"].numericValue` (ms) |
| **Performance score** | Home (optional) | `categories.performance.score` (0–1) |
| **Total page weight** | Reference | `audits["total-byte-weight"].numericValue` (bytes) |
| **Script transfer (NFR-P2 proxy)** | Sum Script sizes | `audits["resource-summary"].details.items` where `label == "Script"` → `size` (bytes) |

Suggested CLI (after you have a **reachable** base URL):

- **Lighthouse 12.x**, `--form-factor=mobile`, `--only-categories=performance`  
- Optional helper (only if you set URLs explicitly): [scripts/capture-legacy-baselines.sh](../scripts/capture-legacy-baselines.sh) — **does not** default to a dead host.

---

## Rerun after each material release (architecture §13)

1. Same Lighthouse major and mobile defaults as the prior capture.  
2. Same **production** URLs as the last baseline (or document URL changes).  
3. Compare LCP and script transfer to the last committed JSON; respect [migration parity checklist](../docs/migration-parity-checklist.md) for approved **NFR-P2** exceptions.

---

## Historical note (2026-04-20)

An automated attempt to hit the old production host failed (connection refused). That path is **closed** by product decision (host offline); no `legacy-*.json` from that environment is expected.
