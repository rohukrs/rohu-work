// shared masthead for every inner page (work, life, write, videos, about).
// reads window.SITE from content.js, so editing content.js updates every page's nav.
// set <body data-section="work"> (matching a menu label) to highlight it as active.
(function () {
  const S = window.SITE;
  const section = document.body.dataset.section || "";
  const mount = document.getElementById("site-header");
  if (!mount || !S) return;

  mount.innerHTML = `
    <a class="mh-photo-link" href="/" aria-label="rohu — home">
      <img class="mh-photo" src="/${S.photo}" alt="" />
    </a>
    <div class="mh-brand">
      <a class="mh-name" href="/">${S.name}</a>
      <nav class="mh-nav" aria-label="menu">
        ${S.menu
          .map(
            (m) =>
              `<a href="${m.page}" ${m.label === section ? 'aria-current="true" class="active"' : ""}>${m.label}</a>`
          )
          .join("")}
      </nav>
    </div>
  `;
})();
