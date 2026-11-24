/*
  ============================================================
  EDIT YOUR WORK / PROJECTS HERE
  ============================================================
  one entry per project. to add a new project:
    1. copy a { ... } block below, paste it, change it
    2. copy the /work/orb folder, rename it to match your new slug
    3. edit the copied index.html's <body data-slug="..."> to match

  fields:
    slug      used in the url, e.g. "orb" -> /work/orb/
    title     project name shown big
    meta      short line under the title, e.g. "co-founder · 2022-2023"
    summary   one or two sentences, shown on the /work index list
    context   the problem / background (one short paragraph)
    actions   what you actually did (one short paragraph)
    outcomes  a list of short result lines
    links     [{ label, url }] - leave the array empty for none
*/

window.WORK = {
  projects: [
    {
      slug: "orb",
      title: "orb",
      meta: "co-founder · jul 2022 – dec 2023",
      summary: "a decentralized social product built on lens protocol. raised $2.3m and grew a community before later joining mask.",
      context: "[add a sentence or two on the problem orb set out to solve]",
      actions: "co-founded and built orb on lens protocol from the ground up. later evaluated the product and led its acquisition into mask network's ecosystem.",
      outcomes: [
        "raised $2.3m",
        // brief had two different waitlist numbers (110k and 70k) — using 110k here, confirm before treating as final.
        "waitlist grew to roughly 110k",
        "discord community reached roughly 12k members",
      ],
      links: [],
    },
    {
      slug: "firefly-mask",
      title: "firefly / mask network",
      // end date unconfirmed — brief flagged "mar 2024 – 2026" as needing confirmation, so left open-ended.
      meta: "growth product manager · mar 2024 – present",
      summary: "growth across firefly, web.bio and orb.club at mask network. 40+ prds shipped.",
      context: "[add a sentence or two on what mask/firefly needed when you joined]",
      actions: "drove product and growth initiatives across firefly, web.bio and orb.club. created 40+ prds. evaluated and led the acquisition of orb into mask.",
      outcomes: [
        "firefly.social day-1 retention improved from 3% to 12%",
        "monthly active users grew from ~300 to 2,000+",
      ],
      links: [],
    },
    {
      slug: "made-it-desi",
      title: "made it desi",
      meta: "creator & host · ongoing",
      summary: "a film / storytelling project spotlighting desi founders and creators. season 3, shakti, focuses on women founders.",
      context: "[add a sentence or two on why you started made it desi]",
      actions: "developing stories, interviews and community around desi founders and creators. currently building season 3, shakti, centered on women founders and their journeys.",
      outcomes: [
        "season 3 (shakti) in development",
      ],
      links: [
        { label: "instagram", url: "https://www.instagram.com/madeitdesi/" },
      ],
    },
    {
      slug: "nudo-films",
      title: "nudo films",
      // exact title, dates and responsibilities unconfirmed per brief — left as placeholders, do not invent.
      meta: "founding member · [confirm dates]",
      summary: "[confirm your exact role, dates and a short summary before publishing]",
      context: "[add details here]",
      actions: "[add details here]",
      outcomes: [],
      links: [],
    },
  ],
};
