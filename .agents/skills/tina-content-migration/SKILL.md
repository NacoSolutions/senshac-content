# Tina content migration

Use when planning or reviewing a future TinaCMS editorial-content cutover.

1. Read `README.md`, `docs/cutover-plan.md`, and `docs/editorial-export-contract.md` before proposing migration work.
2. Treat `NacoSolutions/senshac` as canonical until an explicit cutover seed is approved; keep this repository limited to editorial content and localization.
3. Validate pinned exports with `bun scripts/validate_export.mjs` and `bun test`; require an immutable lowercase 40-character source revision and exact locale behavior.
4. Keep migration reversible and read-only: do not add Astro components, Tina schemas/generated files, deployment settings, credentials, or plaintext environment files.
5. Record unresolved topology, preview, rollback, media, or routing decisions as follow-up work rather than silently implementing them.

Acceptance: the export contract remains deterministic and fail-closed, no production ownership changes, and no Tina/deployment/secret artifacts are introduced before cutover approval.
