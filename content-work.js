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
    meta      short line under the title, e.g. "co-founder, 2022-2023"
    summary   one sentence shown on the /work index list
    story     the full story — one or two short paragraphs, written
              the way you'd tell it, not a resume. each array entry
              is its own paragraph.
    outcomes  short, concrete result lines — these show big and bold
    links     [{ label, url }] - leave the array empty for none
*/

window.WORK = {
  projects: [
    {
      slug: "orb",
      title: "orb",
      meta: "co-founder, jul 2022 – dec 2023",
      summary: "a decentralized social product built on lens protocol, later acquired by mask.",
      story: [
        "[add a sentence or two on the problem orb set out to solve and why you started it]",
        "co-founded and built orb on lens protocol from the ground up. later evaluated the product myself and led its acquisition into mask network's ecosystem.",
      ],
      outcomes: [
        "raised $2.3m",
        // brief had two different waitlist numbers (110k and 70k) — using 110k here, confirm before treating as final.
        "110k on the waitlist",
        "12k in the discord",
      ],
      links: [],
    },
    {
      slug: "firefly-mask",
      title: "firefly / mask network",
      // end date unconfirmed — brief flagged "mar 2024 – 2026" as needing confirmation, so left open-ended.
      meta: "growth product manager, mar 2024 – present",
      summary: "growth across firefly, web.bio and orb.club at mask network.",
      story: [
        "[add a sentence or two on what mask/firefly needed when you joined]",
        "drove product and growth initiatives across firefly, web.bio and orb.club. shipped 40+ prds. evaluated and led the acquisition of orb into mask.",
      ],
      outcomes: [
        "firefly day-1 retention: 3% → 12%",
        "monthly actives: ~300 → 2,000+",
      ],
      links: [],
    },
    {
      slug: "made-it-desi",
      title: "made it desi",
      meta: "founder, apr 2026 to present",
      summary: "a film and storytelling project telling authentic stories of desi founders and builders.",
      story: [
        "[add a sentence or two on why you started made it desi]",
        "working on made it desi full-time — developing stories, interviews and community around desi founders and creators. currently building season 3, shakti, centered on women founders and their journeys.",
      ],
      outcomes: ["season 3, shakti — in development"],
      links: [
        { label: "instagram", url: "https://www.instagram.com/madeitdesi/" },
        { label: "launch video", url: "https://x.com/rohukrs/status/2063297403210662137" },
        { label: "founder story", url: "https://www.youtube.com/watch?v=X7GyQyFZim0" },
      ],
    },
    {
      slug: "nudo-films",
      title: "nudo films",
      // exact title, dates and responsibilities unconfirmed per brief — left as placeholders, do not invent.
      meta: "founding member / creative producer, jan 2019 to jul 2021",
      summary: "a new delhi production house making ads and brand films for names like g‑shock and under armour.",
      story: ["a new delhi production house making ads and brand films for names like g‑shock and under armour. i was on the founding team, taking work from pitch to final cut."],
      outcomes: ["50+ people led", "100+ video projects"],
      links: [],
    },
  ],
};

/*
  ============================================================
  THE /work PAGE (the archive you see at rohu.work/work)
  ============================================================
  intro       short paragraphs at the top
  experience  one entry per company. keep it to 3-4 points each.
  selected    groups of work. each item is { title, url }.
              note is an optional grey line under a group heading.
  writing     the small link at the bottom.
  every link opens in a new tab.
*/

window.WORK.archive = {
  intro: [
    "i work at the intersection of product, growth, and storytelling.",
    "over the last 8+ years, i've built and scaled consumer startups, led growth for onchain social products, and directed films, ads, and founder stories.",
    "i co-founded a tech startup in 2023, helped scale it to tens of thousands of users, and have worked in growth roles at startups in san francisco. alongside this, i'm building made it desi, a video project telling authentic stories of desi founders and builders.",
    "i'm most excited when growth strategy, product thinking, and visual storytelling come together.",
  ],

  /*
    experience: newest first. each entry:
      name      big yellow title. links to url if there is one.
      url       main destination for the name ("" for none)
      role, dates, place
      about     one to three short paragraphs
      points    achievements and metrics
      links     [{ label, url }] shown as a small row
      media     reserved for later: photos, videos, screenshots, case study,
                articles. e.g. { type: "video", url: "...", caption: "..." }
                nothing renders until you add something here.
      caseStudy reserved for later: e.g. "/work/orb/" once the page is ready
  */
  experience: [
    {
      name: "made it desi",
      url: "https://www.madeitdesi.com/",
      role: "creator, host & founder",
      dates: "2025 to present",
      place: "",
      about: [
        "an independent film and storytelling project documenting desi founders, creators and people building something of their own.",
        "i develop the stories, meet the people behind them, and bring their journeys to screen. season 3, shakti, focuses on women founders and their journeys.",
      ],
      points: [],
      links: [
        { label: "website", url: "https://www.madeitdesi.com/" },
        { label: "instagram", url: "https://www.instagram.com/madeitdesi/" },
        { label: "youtube", url: "https://www.youtube.com/@madeitdesi/" },
      ],
      media: [],
      caseStudy: "",
    },
    {
      name: "mask network / firefly",
      url: "https://www.mask.io/",
      role: "growth product manager",
      dates: "mar 2024 to 2026",
      place: "san francisco",
      about: [
        "worked across firefly, web.bio and orb.club, shaping product strategy and growth.",
      ],
      points: [
        "evaluated and helped bring orb into the mask ecosystem.",
        "wrote 40+ product requirement documents across activation, retention and engagement.",
        "improved firefly day-1 retention from 3% to 12%.",
        "grew monthly active users from ~300 to 2,000+.",
      ],
      links: [
        { label: "mask network", url: "https://www.mask.io/" },
        // couldn't verify a firefly website, so this is the official app store listing.
        { label: "firefly", url: "https://apps.apple.com/app/id1640183078" },
      ],
      media: [],
      caseStudy: "",
    },
    {
      name: "orb",
      url: "https://orb.club/",
      role: "co-founder, product & growth",
      dates: "jul 2022 to sep 2023",
      place: "",
      about: [
        "co-founded a decentralized social app built on lens protocol, and helped take it from an early idea to a funded startup and community.",
        "orb was acquired by maskdao in june 2025.",
      ],
      points: [
        "raised $2.3m.",
        "built a waitlist of 110k.",
        "grew the discord community to 12k members.",
        "led product strategy, go-to-market and growth.",
      ],
      links: [
        { label: "website", url: "https://orb.club/" },
        { label: "acquisition announcement", url: "https://masknetwork.medium.com/maskdao-acquires-orb-club-4e60950ee366" },
      ],
      media: [],
      caseStudy: "",
    },
    {
      name: "nudo films",
      // no verified nudo films website or channel yet. add it here when you have it.
      url: "",
      role: "founding member",
      dates: "jan 2019 to jul 2021",
      place: "delhi, india",
      about: [
        "part of an independent film collective in delhi, working on filmmaking and storytelling before moving to the us for graduate school.",
      ],
      points: [
        "led a team of 50+ people across 100+ video projects.",
      ],
      links: [],
      media: [],
      caseStudy: "",
    },
  ],

  selected: [
    {
      heading: "product launch videos",
      note: "",
      items: [
        { title: "founder launch video, frontrunner", url: "https://www.linkedin.com/posts/mayanayyar_we-got-into-y-combinator-frontrunner-more-activity-7503464797250846721-vKlF" },
        { title: "startup introduction videos, made it desi", url: "https://x.com/rohukrs/status/2085978534569521593" },
        { title: "firefly product launch", url: "https://x.com/thefireflyapp/status/1874908004404859357" },
        { title: "made it desi launch video", url: "https://x.com/rohukrs/status/2063297403210662137" },
        { title: "emergent labs hq product launch", url: "https://x.com/ycombinator/status/1927409468956193085" },
        { title: "more selected work", url: "https://x.com/rohukrs/status/2015830606463271337" },
      ],
    },
    {
      heading: "founder stories & interviews",
      note: "made it desi. meeting people, hearing their stories, turning them into films.",
      items: [
        { title: "changing the future: angad daryani", url: "https://www.youtube.com/watch?v=X7GyQyFZim0&t=10s" },
        { title: "this 20 year old is decentralizing human intelligence", url: "https://www.youtube.com/watch?v=hI0r-qHtjQg&t=24s" },
        // couldn't read the title behind this short link. rename it to the real story title.
        { title: "another founder story", url: "https://t.co/q41nSIBZWP" },
      ],
    },
    {
      heading: "video editing",
      note: "",
      items: [
        { title: "g‑shock × kieren d'souza", url: "https://www.youtube.com/watch?v=BrrJi7I9ZRU" },
        { title: "under armour india", url: "https://www.youtube.com/watch?v=T32V0yAOsKQ" },
        { title: "thaicrate, fresh thai food delivery", url: "https://www.youtube.com/watch?v=rqM4MWneH8s" },
      ],
    },
  ],

  writing: {
    line: "occasional thoughts on building, creating, and figuring things out.",
    label: "read on medium",
    url: "https://medium.com/@rohukrs",
  },
};
