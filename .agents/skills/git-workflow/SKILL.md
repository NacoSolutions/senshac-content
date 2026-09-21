# Git workflow

Use when changing repository files or preparing a handoff.

1. Start with `git status --short --branch` and keep harness files such as `.pi/`, `.gitconfig.burrow`, and `.warren/agent.json` untracked.
2. Work on the Warren branch; never edit `main` directly.
3. Review the diff with `git diff --check` and `git diff --stat`.
4. Stage only intended documentation, skill, and config files, then commit with a focused message: `git add <files> && git commit -m "docs: add repository skills"`.
5. Confirm the result with `git status --short --branch` and `git log -1 --oneline`. Do not push; Warren delivers the branch and opens the PR.

Acceptance: no unrelated files are staged, the commit contains the intended changes, and no plaintext secrets or deployment configuration are introduced.
