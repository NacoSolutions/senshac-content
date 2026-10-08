# Senshac Content Repository

TinaCloud writes editorial changes to this repository. Editorial commits remain
here; a content-path workflow dispatches the exact SHA to the deployment
workflow in `senshac-web`.

## Rules

- Keep editorial content and localization source here.
- Route website publication through
  `.github/workflows/dispatch-web-content-deploy.yml` and a repository-scoped
  GitHub App dispatch token.
- Keep source revisions, editorials, and their commits in their owning repos;
  content publication triggers a Pages build without changing `senshac-web`.
- Do not add Astro components, Tina schema, `tina/__generated__`, or `tina/tina-lock.json`.
- Keep Cloudflare API tokens, Tina tokens, R2 keys, and Pages project
  configuration in their owning repositories/platform secrets.
- Use focused branches and pull requests; never edit `main` directly.
- During transition, canonical Seeds/Terrarium state remains in `NacoSolutions/senshac`.

## Repository tooling

This repository uses the pinned Seeds (`sd`) and Mulch (`ml`) tooling. At the start of a session, run `sd prime` for tracker context, then `sd ready` to inspect unblocked work. Run `ml prime` to load repository expertise before making changes. Before finishing, preserve useful setup or workflow knowledge with `ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."`.

## Agent guidance

For focused autonomous changes, follow [Bounded Warren Task](.agents/skills/bounded-warren-task/SKILL.md) and [Senshac Agent Principles](.agents/skills/senshac-agent-principles/SKILL.md). Use positive phrasing and specific instructions; apply defense in depth, gentle coding, direct execution, and token economy. Keep the named objective and files explicit, inspect the smallest relevant surface, preserve adjacent behavior, and verify with one bounded quality gate before committing.

Use these curated role skills for focused work:

- [Git Workflow](.agents/skills/git-workflow/SKILL.md) for scoped commits and pull-request handoff.
- [Terrarium Triage](.agents/skills/terrarium-triage/SKILL.md) for selecting one owned, unblocked Seed from the canonical Senshac graph.
- [Writing Documentation](.agents/skills/writing-docs/SKILL.md) for affirmative, actionable repository guidance.
- [Verification Before Completion](.agents/skills/verification-before-completion/SKILL.md) for final documentation and configuration checks.
- [Tina Content Migration](.agents/skills/tina-content-migration/SKILL.md) for localized editorial-content migration and export validation.
- [Bun and Web Toolchain](.agents/skills/toolchain-bun-web/SKILL.md) for the pinned Bun setup, content checks, and generated-artifact contract.
- [Security Review](.agents/skills/security-review/SKILL.md) for content, localization, export, and publishing-boundary changes.
- [Terrarium Triage](.agents/skills/terrarium-triage/SKILL.md) for selecting one owned, unblocked Seed from the canonical Senshac graph.

## Portable rules and CLI skills

Load `.agents/rules/` for Caveman ultra, direct execution, positive phrasing,
defense in depth, gentle coding, token economy, and llm-shorthand. Load
`instruction-specificity.md` when authoring agent guidance. Use the local
`seeds-cli`, `mulch-cli`, `warren-operations`, and
`verification-before-completion` skills for tracker, expertise, Warren, and
completion work. Load role-specific skills for the implementation surface.
