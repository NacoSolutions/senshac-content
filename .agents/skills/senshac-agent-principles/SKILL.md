# Senshac Agent Principles

Apply these six principles to every focused change in this repository:

## Direct execution

Execute the requested repository work in the named files. Inspect the relevant files, make the smallest correct edit, run the documented validation, and commit the result.

**Acceptance check:** The requested files contain the change, the validation command exits zero, and `git status --short` shows no uncommitted change after the commit.

## Instruction specificity

State the objective, file paths, commands, and acceptance checks before editing. Keep each instruction concrete enough to verify from the repository.

**Acceptance check:** The task identifies a named objective, an explicit file set, a bounded command, and a measurable result.

## Positive phrasing

Describe the desired action and outcome directly. Use affirmative instructions such as “preserve,” “run,” “confirm,” and “keep” so guidance tells the agent what success looks like.

**Acceptance check:** Newly added guidance uses affirmative statements and names the expected outcome for each action.

## Defense in depth

Verify important constraints at more than one boundary: inspect before editing, validate after editing, and review the final diff and commit. Protect repository content by limiting edits to the named guidance and configuration files.

**Acceptance check:** The final review confirms the intended paths changed, protected paths stayed unchanged, and the bounded validation passed.

## Gentle coding

Preserve adjacent behavior and existing project guidance. Make focused, reversible edits, retain compatible wording, and avoid unrelated cleanup or production changes.

**Acceptance check:** The diff contains only the requested guidance/configuration updates and leaves editorial content, tracker state, and production files intact.

## Token economy

Read the smallest relevant surface, use focused commands, and report only the files changed, validation result, commit, and follow-up. Spend effort on correctness rather than repetition.

**Acceptance check:** The work uses one bounded validation command and the completion report identifies its result without unrelated detail.

## Repository workflow

Use the repository tools and commands that apply to the task:

```bash
sd prime
sd ready
ml prime
# inspect the named files
# edit only the named guidance/configuration files
# run the bounded validation
 git diff --check
 git status --short
 git commit -m "docs: finalize agent guidance"
```

Confirm the final commit contains the intended files and the validation exits zero before reporting completion.
