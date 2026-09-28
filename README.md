# Senshac Content

TinaCloud writes editorial changes to this repository. `senshac-web` consumes a
reviewed immutable commit; a content update opens or refreshes a focused PR in
the web repository, and Cloudflare Pages rebuilds after that PR merges. This
editorial publishing path does not by itself complete the broader cutover and
rollback acceptance criteria below.

## Development environment

The repository uses [devenv](https://devenv.sh/) for its reproducible local
shell. It supplies Bun and the repository's named checks directly, without
requiring an external package-manager configuration.

```sh
devenv shell
bun install --frozen-lockfile
bun run test
bun run lint
bun run typecheck
```

The same checks are available as devenv scripts (`devenv shell test`,
`devenv shell lint`, and `devenv shell typecheck`). `devenv.yaml` declares the
Nix package source and `devenv.nix` is the single environment definition.

## Ownership

- Editorial JSON/MDX and localized project content
- Translation and content-review workflow
- Editorial media references; media storage and policy remain external

This repository must not own Astro components, Tina schema, generated Tina artifacts, Cloudflare credentials, R2 policy, or deployment configuration.

## Cutover prerequisites

1. Agree the TinaCloud generator/content topology.
2. Prove local Tina visual editing using `localContentPath`.
3. Prove preview, production build, and rollback from a pinned content commit.
4. Define media ownership and R2 references without plaintext secrets.
5. Update Warren routing and the Senshac workspace registry.
6. Migrate content reversibly; retain the monorepo as rollback source until production verification.

## Web revision updates

`.github/workflows/update-web-content-revision.yml` watches relevant content
paths on `main` and uses the repository's installed GitHub App to open or
refresh a PR in `NacoSolutions/senshac-web`. The PR updates the default
`SENSHAC_CONTENT_REVISION` pin to the exact content commit. The workflow uses
the App token only for the web repository and never pushes to web `main`.
`workflow_dispatch` accepts a full commit SHA reachable from content `main`
for a controlled retry. Local web verification can still override the pin with
`SENSHAC_CONTENT_REVISION`.

## Read-only cutover handoff fixture

The bounded, non-secret pinned-export contract for the future `senshac-web`
adapter is documented in [`docs/editorial-export-contract.md`](docs/editorial-export-contract.md).
It includes a JSON export schema, deterministic fixture validation, and explicit
`ready`, `stale`, `missing`, and `error` behavior. This does not make this
repository production-authoritative or add Tina/ Astro/deployment artifacts.
