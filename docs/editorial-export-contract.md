# Pinned editorial export contract (v1)

This is a content-side handoff fixture for `senshac-web`. It is deliberately
not a Tina schema, Astro component, deployment configuration, or production
content source. The canonical source remains `NacoSolutions/senshac` until the
cutover gates in [`cutover-plan.md`](cutover-plan.md) are approved.

## Export shape

`fixtures/editorial-export.json` is a checked-in, non-secret example of the
export at `schema/editorial-export.schema.json`:

- `contractVersion` is the integer `1`.
- `sourceRevision` is the exact, immutable, lowercase 40-character Git SHA
  from which the export was produced. It must never be `latest`, a branch, or a
  moving alias.
- `entries` contains editorial records keyed by the pair `id` and `locale`.
  `id` is a lowercase slug; `locale` is `ll` or `ll-RR`. `title` and `body` are
  non-empty strings. Unknown fields and duplicate `(id, locale)` pairs are
  invalid.
- The fixture contains no secrets, credentials, media keys, or deployment
  settings. Media ownership remains outside this repository.

The adapter must treat the export as read-only and must not mutate it or infer
fallback content from it.

## Editable header and footer chrome

The Tina-editable site configuration in [`config/site.json`](../config/site.json)
uses the canonical chrome contract described by
[`schema/site-config.schema.json`](../schema/site-config.schema.json). Both
`header` and `footer` provide:

- `mode`: `fixed` or `scrolling`.
- `atFinal`: an appearance preset used when the chrome is at its final state.
- `scrolling`: an appearance preset used while the page is scrolling.

Both appearance fields accept one of `transparent-adaptive`,
`transparent-light`, `transparent-dark`, `opaque-light`, or `opaque-dark`.

The contract is content-side configuration only. Rendering behavior remains the
responsibility of the consuming workspace.

## Adapter handoff behavior

The web adapter supplies an expected revision and requests an `(id, locale)`:

| Condition | Result | Required behavior |
| --- | --- | --- |
| Export validates, `sourceRevision` equals expected revision, and the pair exists | `ready` | Return the entry and the source revision. |
| Export validates but its revision differs from expected | `stale` | Do not serve the entry; surface the observed and expected revisions so the caller can retry/re-pin. |
| Revision matches but the pair does not exist | `missing` | Return a not-found result for that exact locale. Do not silently fall back to another locale. |
| File cannot be read, JSON is malformed, or validation fails | `error` | Fail closed; return a diagnostic suitable for logs without exposing secrets. Do not serve partial data. |

These outcomes are adapter-level semantics; this repository only supplies the
fixture, schema, and deterministic validator. A later integration task may
implement the web adapter after the cutover seed is approved.

## Validation

From the repository root:

```sh
bun scripts/validate_export.mjs
bun test
```

The validator emits the same success output for the same input and exits nonzero
for any contract violation.
