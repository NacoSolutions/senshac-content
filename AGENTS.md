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

For focused autonomous changes, follow [Bounded Warren Task](.agents/skills/bounded-warren-task/SKILL.md) and [Senshac Agent Principles](.agents/skills/senshac-agent-principles/SKILL.md). Use positive phrasing and specific instructions; apply defense in depth, gentle coding, direct execution, and token economy. Keep the named objective and files explicit, inspect the smallest relevant surface, preserve adjacent behavior, and verify with one bounded quality gate before committing.

### Repository skills

| Skill | When to use it |
| --- | --- |
| [Senshac Agent Principles](.agents/skills/senshac-agent-principles/SKILL.md) | Every task; sets the portable execution and scope rules. |
| [Git workflow](.agents/skills/git-workflow/SKILL.md) | Before editing, staging, committing, or handing off a branch. |
| [Writing docs](.agents/skills/writing-docs/SKILL.md) | When adding or revising Markdown guidance, contracts, or skills. |
| [Verification before completion](.agents/skills/verification-before-completion/SKILL.md) | Before claiming completion or handing work to Warren. |
| [Tina content migration](.agents/skills/tina-content-migration/SKILL.md) | When planning or reviewing future editorial/Tina cutover work. |
