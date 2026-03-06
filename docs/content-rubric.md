# Release Radar Content Rubric

Use this rubric before adding or updating a title in `data/releases-2026.json`.

## Include it if
- The release is likely to drive real conversation outside a niche fandom.
- The date or quarter is credible enough to place on a public-facing calendar.
- The title can be explained with a one-line hook and a short editorial blurb.
- The platform or theatrical status is known.

## Skip it if
- It is straight-to-streaming filler with no meaningful mainstream pull.
- It is reality TV without genuine crossover relevance.
- It has no credible date window and no obvious cultural significance.
- It only matters to completists using database-style apps.

## Heat Score guide
- `5`: A cultural event or franchise peak most users will recognize immediately.
- `4`: Strong mainstream anticipation with clear social or critical momentum.
- `3`: Solid watch-list material for engaged viewers, but not a major event.
- `2`: Worth noting for a specific audience, with limited general buzz.
- `1`: Rarely used in v1; if a title feels this quiet, it probably should not be included.

## Copy constraints
- `shortDescription`: 1 sentence, ideally under 100 characters.
- `editorialBlurb`: 2 to 3 sentences, under 240 characters when possible.
- `tags`: 2 to 4 labels that help a user understand why the title matters.

## Field completeness
- `id` and `slug` must be stable and URL-safe.
- `releaseStatus` must be either `confirmed` or `tba-quarter`.
- `releaseDate` must be `YYYY-MM-DD` when confirmed, otherwise blank.
- `releaseQuarter` is required for every item.
- `posterUrl` and `trailerUrl` may be blank during the seed phase, but the UI should still render cleanly.

## Editorial note
The current data file is a starter seed, not a final verified industry calendar. Confirm release shifts and poster/trailer assets before public launch.
