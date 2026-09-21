# Writing documentation

Use when adding or revising repository guidance, contracts, or skills.

1. Read the relevant `AGENTS.md`, `README.md`, and linked document before editing.
2. Write concise Markdown with headings, actionable commands, repository-specific paths, and explicit acceptance checks.
3. Preserve existing caveats: this is a future editorial split, not the production Tina source; do not add Astro, Tina, deployment, or secret material.
4. Check links and formatting with `git diff --check`, then inspect the rendered text with `grep -R` or `find` as appropriate.

Acceptance: every instruction is positive and specific, commands are runnable from the repository root, links resolve to tracked files, and existing guidance remains intact.
