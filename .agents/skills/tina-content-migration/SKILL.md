# Tina Content Migration

Use this skill for a planned TinaCMS editorial-content migration in Senshac.

## Workflow

- Confirm the approved cutover seed and the source content revision before migrating.
- Inspect localized content with `find pages legal projects translations -type f | sort`.
- Validate the read-only export with `bun test tests/export_contract.test.mjs`.
- Check the export contract and migration notes in `docs/editorial-export-contract.md` and `docs/cutover-plan.md`.
- Preserve locale parity, stable content identifiers, and reversible source revisions.
- Record media references as secret-free paths and environment references as deployment-neutral settings.
- Keep the migration scoped to editorial content and localization ownership.

## Acceptance checks

- The approved source revision is pinned and reviewable.
- Every migrated content item has a stable identifier and supported locale.
- `bun test tests/export_contract.test.mjs` exits zero.
- The export remains deterministic and reports the expected readiness state.
- Rollback points and content ownership are documented before cutover.
