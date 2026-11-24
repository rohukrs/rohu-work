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
    // index: the archive. intro, experience, selected work, writing.
    const A = window.WORK.archive;
    const ext = (url, label) =>
      `<a class="arc-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}<span class="arc-arrow" aria-hidden="true">↗</span></a>`;

    mount.innerHTML = `
      <section class="arc-intro">
        ${A.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
      </section>

      <section class="arc-section" aria-labelledby="arc-exp">
        <h2 class="arc-heading" id="arc-exp">experience</h2>
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

      <section class="arc-section" aria-labelledby="arc-sel">
        <h2 class="arc-heading" id="arc-sel">selected work</h2>
        ${A.selected.map((g) => `
          <div class="arc-group">
            <h3 class="arc-group-title">${esc(g.heading)}</h3>
            ${g.note ? `<p class="arc-note">${esc(g.note)}</p>` : ""}
            <ul class="arc-links">${g.items.map((it) => `<li>${ext(it.url, it.title)}</li>`).join("")}</ul>
          </div>`).join("")}
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
