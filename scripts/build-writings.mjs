// builds rohu.work into _site/ so vercel can publish it.
// plain node, no packages to install. vercel runs this on every push (see vercel.json).
//
// reads every writings/*.md file, skips drafts, and writes:
//   _site/writings/index.html   the list, newest first
//   _site/<slug>/index.html     one page per essay
//   _site/rss.xml, _site/sitemap.xml
// then copies the rest of the site (homepage, work, videos, assets) unchanged.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "_site");
const SITE_URL = "https://rohu.work";

// site files and folders copied into _site/ as they are
const COPY_FILES = ["index.html", "style.css", "content.js", "content-work.js", "partial.js", "script.js", "stamp.js"];
const COPY_DIRS = ["assets", "work", "videos"];

// names the site already uses, so an essay can't take them as its slug
const RESERVED = new Set([
  "writings", "work", "videos", "assets", "rss", "sitemap", "writing",
  "rss.xml", "sitemap.xml", "writing.css",
  ...COPY_FILES.map((f) => f.replace(/\.[^.]+$/, "")),
]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// ---------- helpers ----------

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtDate(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

function rfc822(date) {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

// reads the block between the --- lines at the top of a file
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    } else if (v === "true") {
      v = true;
    } else if (v === "false") {
      v = false;
    }
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

// inline markdown: images, links, code, bold, italics
function inline(text) {
  const codes = [];
  let s = esc(text);
  // pull code spans out first so their contents aren't treated as markdown
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${href}"${ext}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/(^|[^\w])_([^_\n]+)_(?=[^\w]|$)/g, "$1<em>$2</em>");
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
  return s;
}

// markdown body to html: headings, paragraphs, quotes, lists, rules
function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length === 1 ? 2 : h[1].length + 1; // # becomes h2, the page title is h1
      out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      out.push(`<blockquote><p>${inline(buf.join(" ").trim())}</p></blockquote>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
      out.push(`<ul>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; }
      out.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`);
      continue;
    }

    // paragraph: runs until a blank line or the start of another block
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|>|\s*[-*]\s|\s*\d+\.\s|---+\s*$)/.test(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

function nav() {
  return `<header class="writing-nav">
  <a class="writing-nav-home" href="/">rohu</a>
  <nav aria-label="main navigation">
    <a href="/">home</a>
    <a href="https://www.youtube.com/@rohukrs" target="_blank" rel="noopener">youtube ↗</a>
    <a href="https://www.instagram.com/rohukrs/" target="_blank" rel="noopener">instagram ↗</a>
  </nav>
</header>`;
}

function page({ title, description, canonical, body, type = "website" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE_URL}/assets/stamp.webp" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="stylesheet" href="/writing.css" />
  <link rel="alternate" type="application/rss+xml" title="rohu writings" href="/rss.xml" />
</head>
<body class="writing-page">
${nav()}
${body}
</body>
</html>
`;
}

// ---------- build ----------

function build() {
  // 1. read the essays
  const dir = path.join(ROOT, "writings");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort() : [];
  const posts = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    if (!SLUG_RE.test(slug)) {
      throw new Error(`writings/${file}: the filename becomes the url, so use lowercase words and hyphens only`);
    }
    if (RESERVED.has(slug)) {
      throw new Error(`writings/${file}: "${slug}" is already used by the site. rename the file.`);
    }
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (data.draft === true) {
      console.log(`skipping draft: ${slug}`);
      continue;
    }
    if (!DATE_RE.test(String(data.date || ""))) {
      throw new Error(`writings/${file}: date must look like "2026-11-24"`);
    }
    posts.push({
      slug,
      title: String(data.title || slug),
      date: String(data.date),
      description: String(data.description || ""),
      html: markdownToHtml(body),
    });
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));

  // 2. start from a clean _site/ and copy the existing site across
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of COPY_FILES) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
  for (const d of COPY_DIRS) fs.cpSync(path.join(ROOT, d), path.join(OUT, d), { recursive: true });
  fs.copyFileSync(path.join(ROOT, "styles", "writing.css"), path.join(OUT, "writing.css"));

  // 3. essays.js: the list the homepage "write" section reads (no separate index page)
  fs.writeFileSync(path.join(OUT, "essays.js"), `window.ESSAYS = ${JSON.stringify(posts.map((p) => ({ title: p.title, date: p.date, slug: p.slug })))};\n`);

  // 4. one page per essay
  for (const p of posts) {
    fs.mkdirSync(path.join(OUT, p.slug), { recursive: true });
    fs.writeFileSync(path.join(OUT, p.slug, "index.html"), page({
      title: `${p.title} — rohu`,
      description: p.description || p.title,
      canonical: `${SITE_URL}/${p.slug}`,
      type: "article",
      body: `<article class="essay">
  <a class="essay-back" href="/">← home</a>
  <header class="essay-header">
    <h1>${esc(p.title)}</h1>
    <time datetime="${p.date}">${fmtDate(p.date)}</time>
  </header>
  <div class="essay-body">
${p.html}
  </div>
  <footer class="essay-footer"><a href="/">← home</a></footer>
</article>`,
    }));
  }

  // 5. rss feed
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/${p.slug}</link>
      <guid>${SITE_URL}/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join("\n");
  fs.writeFileSync(path.join(OUT, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>rohu — writings</title>
    <link>${SITE_URL}/</link>
    <description>essays, observations, lessons from building things and unfinished thoughts.</description>
${items}
  </channel>
</rss>
`);

  // 6. sitemap
  const urls = ["/", "/work/", "/videos/", ...posts.map((p) => `/${p.slug}`)]
    .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n");
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

  console.log(`built ${posts.length} essay(s) into _site/`);
}

build();
