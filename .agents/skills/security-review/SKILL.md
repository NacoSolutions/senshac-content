---
name: security-review
description: Protect Senshac editorial content and publishing boundaries during content changes.
---

# Security review

Use this skill before merging content, localization, export, or publishing-workflow changes that touch sensitive data or cross repository boundaries.

## Actions

- Keep Cloudflare, Tina, R2, and GitHub App credentials in their owning platform secrets; keep tokens and credential-bearing exports out of tracked content.
- Review media references, embedded markup, links, and frontmatter for unsafe executable content or accidental private data.
- Preserve repository ownership: content owns editorial source and locale data, while Tina schema, Astro components, Pages configuration, and R2 policy remain with their owning repositories.
- Run `git diff --check`, `bun run test`, `bun run lint`, and `bun run typecheck` for the relevant content change.

## Acceptance checks

- No secret values, private editorial data, or credential files enter the change.
- Locale and export boundaries remain intact.
- The focused content checks exit zero and the final diff contains only the intended content, docs, or workflow files.
