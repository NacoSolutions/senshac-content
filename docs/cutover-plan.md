# Senshac redesign delivery plan

Status: WEB4 owner redesign in progress. WordPress remains live on
`senshac.com`; DNS migration is explicitly deferred.

## Active sequence

1. **Model the content.** Use generic block identifiers and explicit layout
   variants. Treat this as a breaking migration: migrate all localized page and
   project documents together, reject unknown templates, and do not retain
   aliases or fallback renderers.
2. **Build the owner experience.** Implement the WEB4 homepage and service
   narrative, project proof, process, and three distinct inquiry paths: a new
   space, an underperforming existing space, and business growth/expansion.
   Each path asks only the relevant qualifying questions and accepts useful
   project references (plans or photos) where appropriate.
3. **Make interactions accessible.** Repeated information stays in one content
   block and expands on click/tap and keyboard; hover may be an enhancement,
   never the only way to access content.
4. **Verify Tina editing.** Confirm every block and nested field is selected in
   the live editor, including the homepage banner slogan; verify localized
   edits and TinaCloud-triggered content deployments.
5. **Verify the redesign deployment.** Run content validation, Tina schema
   generation, application quality checks, preview smoke tests, and the
   production-like Pages build. Check the resulting preview without changing
   `senshac.com` DNS.

## Explicit boundaries

- Keep WordPress online for current production traffic; do not prepare or
  rehearse a rollback to WordPress as part of this redesign.
- Do not change DNS or claim a production cutover. The future owner-approved
  DNS decision is separate from this work.
- Keep the source and content histories separate: editorial changes belong in
  `senshac-content`; application and rendering changes belong in
  `senshac-web`.
- Do not store credentials, Cloudflare/R2 keys, or plaintext environment files
  in either repository.

## Acceptance

- All localized page and project files validate against the current generic
  block set with no old identifiers remaining.
- Tina schema generation succeeds against the sibling content checkout.
- Unknown blocks and invalid variants fail with a useful file/block diagnostic.
- Three inquiry routes collect their own relevant qualifications and pass the
  information through the existing protected contact delivery path.
- Interactive repeated content works by pointer, touch, and keyboard.
- Preview deployment and live editing are verified; WordPress remains online
  and DNS remains unchanged.

## Generic block vocabulary

The Tina discriminator vocabulary is `hero`, `banner`, `text`, `showcase`,
`accordion`, `list`, `callout`, `statement`, `carousel`, `feed`, `gallery`,
`form`, `details`, `credits`, and `media`. `text` uses `brief`, `concept`, or
`strategy` when a project section needs a distinct layout. `media` requires the
`banner` or `full` layout variant. These identifiers describe reusable content
shapes, not editorial topics or page-specific roles.
