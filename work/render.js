// renders /work/index.html and every /work/<slug>/index.html from content-work.js
// to change project text, edit content-work.js instead of this file.
(function () {
  const projects = window.WORK.projects;
  const mount = document.getElementById("work-mount");
  const slug = document.body.dataset.slug;

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  if (!slug) {
    // index: selected work first, then experience / resume, then writing.
    const A = window.WORK.archive;
    const ext = (url, label) =>
      `<a class="arc-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}<span class="arc-arrow" aria-hidden="true">↗</span></a>`;

    // one video tile: a 16:9 embed with the title linking to the original video.
    const vid = (it) => {
      if (it.youtube) {
        return `
        <figure class="vid">
          <div class="vid-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(it.youtube)}" title="${esc(it.title)}" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
          <figcaption><a class="vid-title" href="https://www.youtube.com/watch?v=${esc(it.youtube)}" target="_blank" rel="noopener">${esc(it.title)}<span class="arc-arrow" aria-hidden="true">↗</span></a></figcaption>
        </figure>`;
      }
      if (it.needsEmbed) {
        return `
        <figure class="vid">
          <div class="vid-frame vid-empty"><span>add a youtube link in content-work.js</span></div>
          <figcaption><a class="vid-title" href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.title)}<span class="arc-arrow" aria-hidden="true">↗</span></a></figcaption>
        </figure>`;
      }
      return `<div class="vid-plain">${ext(it.url, it.title)}</div>`;
    };

    mount.innerHTML = `
      <section class="arc-section sel-top" aria-labelledby="arc-sel">
        <h1 class="page-title" id="arc-sel">selected work</h1>
        ${A.selected.map((g) => `
          <div class="arc-group">
            <h2 class="arc-group-title">${esc(g.heading)}</h2>
            ${g.note ? `<p class="arc-note">${esc(g.note)}</p>` : ""}
            <div class="vgrid">${g.items.map(vid).join("")}</div>
          </div>`).join("")}
      </section>

      <section class="arc-section" aria-labelledby="arc-exp">
        <h2 class="arc-heading" id="arc-exp">experience / resume</h2>
        <ol class="tl">
          ${A.experience.map((e, i) => {
            const num = String(i + 1).padStart(2, "0");
            const name = e.url
              ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.name)}<span class="arc-arrow" aria-hidden="true">↗</span></a>`
              : esc(e.name);
            const meta = [e.role, e.dates, e.place].filter(Boolean).map(esc).join(" · ");
            const media = (e.media || []).length
              ? `<div class="tl-media">${e.media.map((m) => `<a class="tl-media-item" href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.caption || m.type)}</a>`).join("")}</div>`
              : "";
            const links = [...(e.links || [])];
            if (e.caseStudy) links.unshift({ label: "case study", url: e.caseStudy });
            return `
            <li class="tl-item">
              <span class="tl-num" aria-hidden="true">${num}</span>
              <article>
                <h3 class="tl-name">${name}</h3>
                <p class="tl-meta">${meta}</p>
                ${(e.about || []).map((p) => `<p class="tl-about">${esc(p)}</p>`).join("")}
                ${e.points && e.points.length ? `<ul class="arc-points">${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
                ${media}
                ${links.length ? `<p class="tl-links">${links.map((l) => {
                  const external = /^https?:\/\//.test(l.url);
                  return `<a href="${esc(l.url)}"${external ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}<span class="arc-arrow" aria-hidden="true">↗</span></a>`;
                }).join("")}</p>` : ""}
              </article>
            </li>`;
          }).join("")}
        </ol>
      </section>

      <section class="arc-section arc-intro" aria-label="about">
        ${A.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
      </section>

      <section class="arc-section" aria-labelledby="arc-write">
        <h2 class="arc-heading" id="arc-write">writing</h2>
        <p class="arc-note">${esc(A.writing.line)}</p>
        <p>${ext(A.writing.url, A.writing.label)}</p>
      </section>
    `;
  } else {
    // detail: render the one project matching data-slug
    const p = projects.find((x) => x.slug === slug);
    if (!p) {
      mount.innerHTML = "<p>project not found.</p>";
      return;
    }
    document.title = p.title + " — rohu";
    mount.innerHTML = `
      <h1 class="project-detail-title">${esc(p.title)}</h1>
      <div class="project-detail-meta">${esc(p.meta)}</div>

      ${(p.story || []).map((para) => `<p class="project-story">${esc(para)}</p>`).join("")}

      ${p.outcomes && p.outcomes.length ? `
        <ul class="project-outcomes">
          ${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}
        </ul>
      ` : ""}

      ${p.links && p.links.length ? `
        <div class="project-links">
          ${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
        </div>
      ` : ""}
    `;
  }
})();
