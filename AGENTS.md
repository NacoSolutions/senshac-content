# Senshac Content Repository

Placeholder for a future TinaCMS editorial-content split. Do not treat this as the production source until an explicit cutover seed is approved.

## Rules

- Keep editorial content and localization concerns here only after cutover.
- Do not add Astro components, Tina schema, `tina/__generated__`, or `tina/tina-lock.json`.
- Never commit plaintext environment files, Cloudflare credentials, Tina tokens, R2 keys, or deployment configuration.
- Use focused branches and pull requests; never edit `main` directly.
- During transition, canonical Seeds/Terrarium state remains in `NacoSolutions/senshac`.

## Repository tooling

This repository uses the pinned Seeds (`sd`) and Mulch (`ml`) tooling. At the start of a session, run `sd prime` for tracker context, then `sd ready` to inspect unblocked work. Run `ml prime` to load repository expertise before making changes. Before finishing, preserve useful setup or workflow knowledge with `ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."`.

## Agent guidance

Use [Bounded Warren Task](.agents/skills/bounded-warren-task/SKILL.md) for focused changes to Tina content, editorial files, and content validation. Give positive, specific instructions with a clear desired outcome; use defense in depth for content safety and validation; make gentle, minimal edits that preserve adjacent behavior; execute directly with the project tools; and spend tokens economically. Keep work within the named objective and files, then run a focused documentation/configuration validation and commit the result.
