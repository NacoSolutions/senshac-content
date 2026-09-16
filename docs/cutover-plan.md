# Content split cutover plan

Status: placeholder only. No production migration has started.

Complete this checklist in order. Until the final gate passes, the archived `senshac` monorepo remains the canonical source and the README boundary rules remain in force.

1. **Agree the topology.** Record the TinaCloud project, generator in `senshac`, editorial content in `senshac-content`, and account/deployment policy in `senshac-infra`. Confirm that this repository contains no Astro application, Tina schema, generated Tina artifacts, credentials, or deployment configuration.
2. **Prove visual editing locally.** Configure a disposable/local Tina run to use `localContentPath` pointing at a checked-out content fixture. Demonstrate create, edit, preview, and localized-content flows, and save the reproducible command and expected result without committing secrets or application files.
3. **Pin and build content.** Build a representative multilingual project from an immutable content commit (or equivalent reviewed revision) in preview and production-like checks. Record the revision consumed by each build and verify Warren can run content-only checks and open a PR.
4. **Test rollback before cutover.** Exercise deployment from the pinned revision, then restore the previous known-good revision and verify the site. Document the switch back to the archived monorepo content, including who approves it and how the rollback is audited.
5. **Set media ownership.** Keep media processing with `senshac-media-runner`, R2/account policy with `senshac-infra`, and only editorial references in this repository. Verify reads and references with runtime-managed credentials; never store R2 keys, Cloudflare credentials, or plaintext environment files in Git.
6. **Migrate reversibly.** Seed content from the archived monorepo without deleting or rewriting its source, compare representative locales and media references, and retain a tested sync/rollback path until production verification is complete.
7. **Approve and close.** Obtain explicit cutover-seed approval, verify production behavior and rollback evidence, then update the workspace/routing registry. Do not declare this repository production-authoritative before every preceding gate is green.
