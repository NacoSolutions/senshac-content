# Verification before completion

Use before reporting completion, committing, or handing work to Warren.

1. Run the bounded documentation/config check:
   `test -f .warren/config.yaml && grep -Fxq 'defaultProvider: openrouter' .warren/config.yaml && grep -Fxq 'defaultModel: openai/gpt-5.6-luna' .warren/config.yaml && find .agents/skills -name SKILL.md -print | sort`
2. Run the repository quality gate: `bun test && bun run lint && bun run typecheck`.
3. Inspect `git diff --check`, review `git diff`, and verify `.seeds/` and `.mulch/` were not changed.
4. Confirm the focused commit with `git status --short --branch` and `git log -1 --oneline`.

Acceptance: each command exits zero, the required skills and config values exist, tests/lint/typecheck pass, and only intended documentation/skills/config files are committed.
