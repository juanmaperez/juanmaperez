---
validationTarget: _bmad-output/planning-artifacts/prd.md
validationDate: '2026-04-20'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/source-tree-analysis.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/deployment-guide.md
  - docs/api-contracts.md
  - docs/data-models.md
additionalReferences: none
validationStepsCompleted:
  - step-v-01-discovery
  - step-v-02-format-detection
  - step-v-03-density-validation
  - step-v-04-brief-coverage-validation
  - step-v-05-measurability-validation
  - step-v-06-traceability-validation
  - step-v-07-implementation-leakage-validation
  - step-v-08-domain-compliance-validation
  - step-v-09-project-type-validation
  - step-v-10-smart-validation
  - step-v-11-holistic-quality-validation
  - step-v-12-completeness-validation
validationStatus: COMPLETE
holisticQualityRating: 'B+ (strong for brownfield migration; tighten measurability and leakage)'
overallStatus: Warning
prdPurposeReference: .cursor/skills/bmad-validate-prd/data/prd-purpose.md
---

# PRD validation report

**PRD validated:** `_bmad-output/planning-artifacts/prd.md`  
**Date:** 2026-04-20  
**Validator role:** Validation Architect (BMad **\[VP\]** workflow synthesized in one pass)

---

## Input documents

| Document | Loaded |
|----------|--------|
| PRD | Yes |
| Technical research (Astro migration) | Yes (path from frontmatter) |
| `docs/*` (9 paths from PRD frontmatter) | Assumed present per **[DP]**; not re-read line-by-line in this run |

**Product brief:** None (`briefCount: 0` in PRD frontmatter).

---

## Step 2 — Format detection and structure

### Level-2 headers (order)

1. Executive Summary  
2. Project classification  
3. Success criteria  
4. Product scope  
5. User journeys  
6. Domain-specific requirements  
7. Innovation focus  
8. Web / static product requirements (project-type deep dive)  
9. Scoping decisions (MVP guardrails)  
10. Functional requirements  
11. Non-functional requirements  
12. Assumptions and dependencies  
13. Out of scope  
14. References  
15. Next steps (BMad)

### BMAD core section coverage (per `prd-purpose.md`)

| Required section | Present? | Notes |
|------------------|------------|--------|
| Executive Summary | Yes | Differentiator under `### What makes this special` |
| Success Criteria | Yes | Includes measurable outcomes table |
| Product Scope | Yes | MVP / Growth / Vision |
| User Journeys | Yes | Four narratives |
| Domain requirements | Yes | Short; appropriate for low complexity |
| Innovation analysis | Yes | Labeled “Innovation focus” |
| Project-type requirements | Yes | Web/static subsection |
| Functional Requirements | Yes | FR1–FR19 |
| Non-functional Requirements | Yes | NFR-P/R/S/A |

**Classification:** **BMAD Standard** (all core blocks present; naming variants acceptable).

**Minor structure note:** “Project classification” is a peer `##` to Executive Summary rather than a subsection; acceptable for LLM extraction but optional merge for readability.

---

## Step 3 — Information density

**Severity: Pass**

- Tone is direct; minimal filler (“This is not a generic…” adds justified emphasis).  
- No repeated clusters of anti-patterns from `prd-purpose.md` (“The system will allow users to…”, “It is important to note…”, “In order to…”).

**Optional polish:** Table under “Measurable outcomes” is high-signal; keep.

---

## Step 4 — Product brief coverage

**Status: N/A** — No product brief in `inputDocuments` / `documentCounts.briefCount: 0`.

---

## Step 5 — Measurability (FRs and NFRs)

**Severity: Warning**

**Strengths**

- MVP bullets are concrete (routes, pagination, sitemap, deploy, analytics).  
- Measurable outcomes table ties to Lighthouse, route smoke, CI build time.

**Gaps**

1. **FR19** (“equivalent narrative” / “simplified motion acceptable”) — **subjective**; lacks acceptance tests (e.g. “same section order and copy as legacy” or checklist-based parity).  
2. **FR16** — “hot reload or fast refresh **per Astro norms**” mixes **capability** with **framework**; hard to test without naming a product (see Leakage).  
3. **NFR-P1** — “meet or beat **pre-migration** Lighthouse” requires a **documented baseline capture** procedure (when, which URL, which Lighthouse config); otherwise not reproducible.  
4. **NFR-P2** — “no **large** unused JS bundles” — “large” undefined; suggest threshold (e.g. total JS KiB vs baseline) or drop subjective adjective.

---

## Step 6 — Traceability

**Severity: Warning**

**Aligned chains**

- Vision (precision migration, SEO, minimal JS) → Success criteria (routes, Lighthouse, JS payload) → Journeys (visitor, reader, author) → FR1–FR15, FR18.

**Gaps / orphans**

1. **User success** mentions “**contact paths**”; no dedicated FR for contact affordance (email link, form, or social) — only implied by home / layout. Add **FR20** or explicitly scope “contact” under home in MVP table.  
2. **FR17** (“fails on schema/content errors **when validation is configured**”) — success depends on a future config; tie to MVP acceptance (“validation enabled before cutover”) or split MVP vs phase.  
3. **Scoping** excludes “automatic external link checker”; no FR for **internal link** integrity — consider one line under ops or SEO.

---

## Step 7 — Implementation leakage

**Severity: Warning** (expected for migration PRD; still document)

| Location | Finding |
|----------|---------|
| Executive Summary | Names **Gatsby 2**, **Astro**, **GitHub Pages** — justified as **migration scope** but blurs “what” vs “how”; architecture doc should own stack details. |
| Innovation / Web sections | **Astro**, **islands**, **MPA** — product vocabulary for this initiative; acceptable if PRD is explicitly **technical migration PRD**; for strict BMAD purity, move stack terms to **Architecture** and keep PRD vendor-neutral (“static site generator target TBD” is worse here). |
| **FR16** | Explicit **Astro** — clear leakage vs capability “ Maintainer can run local dev with content reload consistent with chosen SSG”. |

**Recommendation:** Retain stack in vision for this brownfield PRD; **rewrite FR16** to be tool-agnostic or reference “target stack per architecture decision”.

---

## Step 8 — Domain compliance

**Severity: Pass**

- `classification.complexity: low`, domain personal portfolio — no missing HIPAA/PCI/FedRAMP sections.  
- GDPR/analytics mentioned proportionally.

---

## Step 9 — Project-type compliance (`web_app` from CSV)

**Severity: Warning**

PRD `classification.projectType` is **`web_app`**; BMad `project-types.csv` row uses key **`web_app`** with `required_sections` including `browser_matrix;responsive_design;performance_targets;seo_strategy;accessibility_level`.

| Required theme | Coverage |
|----------------|----------|
| browser_matrix | Yes — in “Web / static product requirements” |
| responsive_design | Yes |
| performance_targets | Yes (NFR-P1 + success table) |
| seo_strategy | Yes (FR10–12, MVP bullets) |
| accessibility_level | Yes (WCAG 2.1 Level A target) |

**Mismatch:** CSV `project_type` string is `web_app`; frontmatter uses `web_app` — OK. If tooling expects exact `web_app` from enum only, frontmatter already matches.

---

## Step 10 — SMART (FR quality)

**Severity: Warning** (no critical failures)

| FR | S | M | A | R | T | Notes |
|----|---|---|---|---|---|--------|
| FR1–FR15 | 4–5 | 3–5 | 5 | 5 | 4 | Strong; a few “as today” need legacy reference or link to component inventory |
| FR16 | 3 | 3 | 5 | 5 | 3 | Astro + “norms” hurts M/T |
| FR17 | 4 | 2 | 4 | 5 | 3 | Conditional on “when configured” |
| FR18 | 4 | 4 | 5 | 5 | 4 | “Documented CI” is good |
| FR19 | 3 | 2 | 4 | 4 | 2 | Weakest SMART row |

**Flag:** Any FR with **Traceable < 3** should map explicitly to a journey ID or scope line in a future edit.

---

## Step 11 — Holistic quality

**Rating: B+**

- **Information density:** High for a solo migration PRD.  
- **Dual audience:** `##` headers and FR list work well for LLM chunking.  
- **Coherence:** Vision → scope → FRs reads linearly.  
- **Honesty:** Status line admitting synthesized **[CP]** run helps human reviewers calibrate risk.

**Improve flow:** Move “Next steps (BMad)” to an appendix or replace self-referential **[VP]** bullet now that validation exists.

---

## Step 12 — Completeness

**Severity: Pass**

- No `{{placeholders}}` or `{todo}` in body.  
- Frontmatter: `stepsCompleted`, `inputDocuments`, `documentCounts`, `classification` present.  
- Out of scope and assumptions present.

---

## Consolidated action items (priority)

| Priority | Action |
|----------|--------|
| P1 | Rewrite **FR16** (remove “Astro norms” or tie to architecture ADR). |
| P1 | Make **FR19** testable (parity checklist vs legacy URLs/content order) or demote to Growth. |
| P2 | Add explicit **contact** capability FR or remove “contact paths” from user success. |
| P2 | Define **Lighthouse baseline** capture in assumptions or NFR-P1. |
| P3 | Quantify **NFR-P2** (“large” JS) or reference bundle budget in architecture. |
| P3 | Update **Next steps** to remove circular **[VP]** entry. |

---

## Verdict

| Gate | Result |
|------|--------|
| **Fit for architecture / epics?** | **Yes**, after minor edits (P1–P2). |
| **Fit for autonomous codegen with zero questions?** | **Not yet** — FR16/FR19 and baseline metrics need tightening. |

**Overall status:** **Warning** — PRD is **usable** and **above bar** for a brownfield migration; address P1 items before **[CA] Create Architecture** if you want strict BMAD traceability and measurability.

---

_Report complete. No further validation steps._
