# Git Workflow

Use this skill for focused Senshac content changes.

## Workflow

- Confirm the named objective and file set with `git status --short`.
- Review the change with `git diff --check` and `git diff -- <paths>`.
- Stage only the named guidance or configuration files with `git add <paths>`.
- Commit with a focused message such as `docs: add content agent skills`.
- Confirm the commit with `git show --stat --oneline HEAD` and `git status --short`.
- Warren delivers the committed branch as the pull request.

## Acceptance checks

- The commit contains only the requested skills, `AGENTS.md`, and `.warren/config.yaml` changes.
- `git diff --check` exits zero.
- `git status --short` is empty after the commit.
- The final commit is ready for Warren's pull-request handoff.
