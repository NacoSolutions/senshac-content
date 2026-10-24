# Homepage PDF block-order plan

## Objective

Align the ES, CA, and EN homepage blocks with the sequence in
`WEB HOME PAGE.pdf`, while preserving confirmed media/routes and questionnaire
behavior. The final block before the shared footer will be the Instagram feed,
titled with the localized equivalent of “PROYECTOS DESTACADOS”, filtered by
`novedades`, with Instagram backlinks disabled.

## Evidence and scope

- The content baseline is `senshac-content` `origin/main` at `922c5fb`.
- Existing web rendering and Tina fields already support a titled feed, tag
  filtering, and `disableLinks`; no runtime/schema change is needed.
- The current feed already uses `tag: novedades` and
  `disableLinks: true`; preserve its existing limit/viewport settings.
- The opening La Trobada/Doley showcase already limits output to two.
- Preserve the current hero media, the unconfirmed-image placeholder,
  `projects/rude/cover`, and locale-specific `/works/rude` links.
- Preserve inquiry copy, routes, identifiers, and submission behavior.
- Do not deploy or perform Cloudflare/R2 operations. HLS playback and process
  scrolling were confirmed by the user and need not be retested.

## Target order

1. Hero (update its CTA to the localized Studio/About navigation link; retain media).
2. Headline-only text block.
3. La Trobada/Doley opening showcase.
4. Body-only explanatory text block.
5. Placeholder plus RUDE showcase.
6. Benefits accordion.
7. Existing HLS video.
8. Existing process/phase block.
9. Existing inquiry block, unchanged.
10. Instagram feed titled “PROYECTOS DESTACADOS” (localized), tagged
    `novedades`, with backlinks disabled.

Remove the standalone “Nuestro método” callout and the static featured-work
showcase; the final feed is the PDF’s featured-projects block.

## Implementation and verification

1. Update the content contract to pin the target sequence, split copy, retained
   routes/media, and final feed fields; confirm it fails against current data.
2. Reorder/split the three locale JSON files and update the final feed title and
   hero CTA without changing questionnaire content or unconfirmed media.
3. Update the web homepage E2E contract for the revised rendered order and
   titled, link-disabled feed.
4. Run content quality checks, web lint and Playwright E2E against the focused
   content revision, then review diffs and run `git diff --check`.

## Rollback

Revert the focused content and E2E commits on their feature branches. No
production state or external media is changed.
