# Verification Before Completion

Use this skill before reporting a focused Senshac content-guidance change.

## Workflow

- Run `git diff --check` to validate whitespace and patch formatting.
- Confirm every requested skill file exists with `find .agents/skills -name SKILL.md`.
- Confirm `AGENTS.md` links each requested skill and preserves the existing skill links.
- Confirm `.warren/config.yaml` omits `agentImage`, `defaultProvider`, and `defaultModel`; Warren instance and agent configuration own those choices.
- Review `git diff --stat` and `git status --short` for scope.
- Commit the verified change, then rerun the bounded documentation/config check.

## Acceptance checks

- The documentation/config check exits zero.
- All four curated skill links resolve.
- Existing Senshac instructions, tracker files, and production files remain unchanged.
- The final commit leaves the worktree clean.
