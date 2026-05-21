# Deferred work

Items deferred from code reviews and stories (not blocking current slice).

## Deferred from: code review of 2-1-define-posts-and-projects-schemas (2026-05-21)

- CI runs `npm run build` only, not `npm run check` / `test:schema` — Story **2.4** owns FR17 CI gate.
- `[glob-loader] No files found` warnings on empty collection dirs until Stories 2.2 / 2.3 migrate content.
- No positive fixture proving legacy-shaped valid frontmatter passes — add during **2.2** migration validation.
