# Bounded Warren Task

Use this skill for focused autonomous changes. Apply the shared principles in [Senshac Agent Principles](../senshac-agent-principles/SKILL.md).

## Contract

- Name the objective and the exact files before editing.
- Inspect the smallest relevant surface with `read`, `rg`, or `find` before editing.
- Follow repository-local instructions and run the applicable Seeds, Mulch, and project commands.
- Write specific, affirmative instructions that state the desired outcome.
- Keep edits within the named objective and preserve adjacent behavior.
- Run one relevant, bounded quality gate after editing and repeat it only to verify an actionable repair.
- Commit the completed change so Warren can deliver the branch and pull request.
- Review the final diff and report the commit, checks, and follow-up after clean verification.
- Keep the task within its cost and time cap; report a blocker with its observed cause and next action.

## Acceptance checks

- `git diff --check` exits zero.
- The bounded quality gate exits zero.
- The final diff contains only the named files and the intended change.
- `git status --short` is clean after the commit.

## Completion report

State the files changed, commit, gate command and result, and remaining follow-up.
