# Content split cutover plan

Status: placeholder only. No production migration has started.

## Ownership

- `senshac` remains the Tina generator and live Astro application.
- `senshac-content` will eventually hold editorial source content.
- `senshac-infra` owns account-level Cloudflare and deployment policy.
- `senshac-media-runner` owns media processing; this repo stores references, not production media credentials.

## Acceptance gates

- [ ] TinaCloud generator/content behavior is proven locally.
- [ ] A representative multilingual project builds from this repository.
- [ ] Preview and production deployments consume a pinned content revision.
- [ ] R2/media references work without credentials in Git.
- [ ] Warren can run content-only checks and produce a PR.
- [ ] Rollback to monorepo content is documented and tested.
- [ ] Cutover seed is explicitly approved and closed only after production verification.
