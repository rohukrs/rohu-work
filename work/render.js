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
    // index: list every project
    mount.innerHTML = projects
      .map(
        (p) => `
        <a class="project-item" href="/work/${esc(p.slug)}/">
          <div class="project-item-title">${esc(p.title)}</div>
          <div class="project-item-meta">${esc(p.meta)}</div>
          <div class="project-item-summary">${esc(p.summary)}</div>
        </a>`
      )
      .join("");
  } else {
    // detail: render the one project matching data-slug
    const p = projects.find((x) => x.slug === slug);
    if (!p) {
      mount.innerHTML = "<p>project not found.</p>";
      return;
    }
    document.title = p.title + " — rohu";
    mount.innerHTML = `
      <h1 class="page-title">${esc(p.title)}</h1>
      <div class="project-detail-meta">${esc(p.meta)}</div>

      ${p.context ? `<div class="project-section">
        <div class="project-section-label">context</div>
        <p>${esc(p.context)}</p>
      </div>` : ""}

      ${p.actions ? `<div class="project-section">
        <div class="project-section-label">what i did</div>
        <p>${esc(p.actions)}</p>
      </div>` : ""}

      ${p.outcomes && p.outcomes.length ? `<div class="project-section">
        <div class="project-section-label">outcomes</div>
        <ul class="project-outcomes">
          ${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}
        </ul>
      </div>` : ""}

      ${p.links && p.links.length ? `<div class="project-section">
        <div class="project-links">
          ${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
        </div>
      </div>` : ""}
    `;
  }
})();
