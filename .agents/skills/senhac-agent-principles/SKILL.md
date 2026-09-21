# Senshac Agent Principles

Use these portable rules for every task in this repository:

- **Direct execution:** inspect the named files, make the smallest safe edit, and run the stated check rather than narrating an unperformed plan.
- **Instruction specificity:** name the objective, files, commands, and acceptance checks; preserve adjacent behavior.
- **Positive phrasing:** state the desired result and permitted scope as clear actions; avoid vague or prohibition-only instructions.
- **Defense in depth:** validate inputs and outputs, keep secrets out of content and configuration, and verify both focused behavior and repository health.
- **Gentle coding:** prefer reversible, minimal documentation/configuration changes; do not introduce production or migration behavior prematurely.
- **Token economy:** inspect the smallest relevant surface, reuse repository commands, and record only durable project knowledge.

Acceptance: the change stays within the named scope, the bounded check exits zero, and the final work is committed with `git status` clean apart from harness-owned files.
