# Senshac Content

TinaCloud writes editorial changes to this repository. A content update
dispatches its immutable commit SHA to a `senshac-web` GitHub Actions workflow,
which builds and deploys that revision to Cloudflare Pages. Editorial updates
create no commits or pull requests in `senshac-web`.

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

This repository must not own Astro components, Tina schema, generated Tina
artifacts, Cloudflare credentials, R2 policy, or Pages project configuration.

## Breaking redesign boundary

The owner-led redesign uses generic block identifiers and explicit layout
variants. This is a breaking migration: unknown block names and fields fail
validation; legacy aliases and fallback renderers are not retained. Tina content
and application source retain separate repository histories.

WordPress remains live for current production traffic. DNS migration is a
separate future decision and is not part of this redesign.

See [`docs/cutover-plan.md`](docs/cutover-plan.md) for the active sequence and
acceptance gates.

## Pages content deployments

`.github/workflows/dispatch-web-content-deploy.yml` watches editorial paths on
`main`, validates the exact content SHA, and sends a `repository_dispatch` to
`senshac-web` using a GitHub App token scoped to that repository. The web
workflow builds from its current `main` source plus the supplied content SHA,
then deploys the Pages artifact. Configure `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` in `senshac-web`; the content repository stores neither
Cloudflare secret. `workflow_dispatch` can redeploy a selected content commit
reachable from content `main`.

## Read-only cutover handoff fixture

The bounded, non-secret pinned-export contract for the future `senshac-web`
adapter is documented in [`docs/editorial-export-contract.md`](docs/editorial-export-contract.md).
It includes a JSON export schema, deterministic fixture validation, and explicit
`ready`, `stale`, `missing`, and `error` behavior. This does not make this
repository production-authoritative or add Tina/ Astro/deployment artifacts.
