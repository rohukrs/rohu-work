# writing on rohu.work

essays live in `writings/` as markdown files. push one to GitHub and vercel publishes it.

## publish an essay (github website)

1. open the repo on github, then the `writings` folder
2. add file → create new file, name it with lowercase words and hyphens, e.g. `what-building-taught-me.md`
3. paste this and write:

```md
---
title: "what building taught me"
date: "2026-11-24"
description: "a few notes on making things and learning in public."
draft: false
---

your first paragraph.

a short one-liner gets its own paragraph.
```

4. commit to `main`. vercel rebuilds in about a minute, and the essay is at `rohu.work/what-building-taught-me`.

## drafts

set `draft: true` and the essay is left out of everything public: the writings list, its own page, rss and the sitemap. set it back to `false` (or delete the line) to publish.

## formatting

paragraphs, **bold**, *italics*, [links](https://example.com), `> quotes`, `- lists`, `1. numbered lists`, `---` for a break, and `## headings`.

images: upload to `assets/` and write `![description](/assets/your-image.jpg)`.

## what gets built

`scripts/build-writings.mjs` runs on vercel (see `vercel.json`). it writes `/writings`, one page per essay, `/rss.xml` and `/sitemap.xml` into `_site/`, and copies the rest of the site as it is. `_site/` is generated, so don't edit it.

## dns and social links

- the rohu.work dns is unchanged. use the records vercel shows under project → settings → domains.
- social links for the writing pages are in `scripts/build-writings.mjs` (the `nav()` function).
