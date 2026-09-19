# Senshac Content

Placeholder repository for the future Senshac editorial/content split.

This is **not** the production TinaCMS content source yet. The live site and Tina generator remain in `NacoSolutions/senshac` until the content split acceptance criteria are completed.

## Planned ownership

- Editorial Markdown/MDX and localized project content
- Translation and content-review workflow
- Approved editorial references and assets

This repository must not own Astro components, Tina schema, generated Tina artifacts, Cloudflare credentials, R2 policy, or deployment configuration.

## Cutover prerequisites

1. Agree the TinaCloud generator/content topology.
2. Prove local Tina visual editing using `localContentPath`.
3. Prove preview, production build, and rollback from a pinned content commit.
4. Define media ownership and R2 references without plaintext secrets.
5. Update Warren routing and the Senshac workspace registry.
6. Migrate content reversibly; retain the monorepo as rollback source until production verification.

Until then, do not add production content here.

## Read-only cutover handoff fixture

The bounded, non-secret pinned-export contract for the future `senshac-web`
adapter is documented in [`docs/editorial-export-contract.md`](docs/editorial-export-contract.md).
It includes a JSON export schema, deterministic fixture validation, and explicit
`ready`, `stale`, `missing`, and `error` behavior. This does not make this
repository production-authoritative or add Tina/ Astro/deployment artifacts.
