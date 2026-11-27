/*
  ============================================================
  EDIT YOUR WEBSITE HERE
  ============================================================
  this is the only file you need to touch to change the homepage.
  change the text between the quotes, save, and redeploy.

  menu items:
    label        the word shown in the reel and nav (life/work/write/videos)
    description  one or two short sentences shown when this section is selected.
                 write it as plain text — line breaks become separate paragraphs.
    cta          optional {label, href} link shown under the description,
                 e.g. linking "work" through to the full /work/ page. use
                 null for none.

  quickLinks: the small row of links at the bottom of the identity column.
*/

window.SITE = {
  name: "rohu",
  tagline: "est 1997",
  photo: "assets/stamp.webp",

  menu: [
    {
      label: "life",
      // no separate page yet — this is the homepage's own section.
      page: "/",
      description:
        "i love to hear stories and cover them on my camera. if you know anyone in this world who has a story that needs to be told, just mail me or tell me. i look at every message and every email. apparently, not a lot of people email you personally.",
      cta: null,
    },
    {
      label: "work",
      page: "/work/",
      inline: true,
      description:
        "i build products, grow communities and tell stories. a mix of product thinking, startup building and creative work.",
      cta: { label: "see full work ↗", href: "/work/" },
    },
    {
      label: "videos",
      page: "/videos/",
      inline: "videos",
      description:
        "films, founder stories, interviews and experiments in moving images. selected work and stories from made it desi.",
      cta: { label: "watch made it desi on instagram ↗", href: "https://www.instagram.com/madeitdesi/" },
    },
  ],

  quickLinks: [
    { label: "linkedin ↗", href: "https://www.linkedin.com/in/rohit-kumar-0443b3183/" },
    { label: "instagram ↗", href: "https://instagram.com/rohukrs" },
    { label: "made it desi ↗", href: "https://instagram.com/madeitdesi" },
  ],
};
