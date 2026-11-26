// the homepage: fixed "rohu" + a rolling suffix (life/work/write/videos),
// pill nav below it, and the matching description swapped in underneath.
// to change words, links or copy, edit content.js instead of this file.
(function () {
  const S = window.SITE;

  document.getElementById("est").textContent = S.tagline;
  document.getElementById("brandName").textContent = S.name;
  document.getElementById("photo").src = S.photo;
  document.getElementById("photo").alt = S.name;

  const windowEl = document.getElementById("reelWindow");
  const track = document.getElementById("reelTrack");
  const nav = document.getElementById("nav");
  const content = document.getElementById("sectionContent");
  const quickLinks = document.getElementById("quickLinks");

  let current = 0;
  let busy = false;

  function renderSection(i) {
    const m = S.menu[i];
    quickLinks.hidden = m.label !== "life";
    const paragraphs = m.description
      .split("\n")
      .map((line) => `<p class="description">${line}</p>`)
      .join("");
    const list = window.ESSAYS || [];
    const essays = m.essays
      ? list.length
        ? `<ul class="essay-list">${list.map((e) => `<li><a href="/${e.slug}">${e.title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</a><time datetime="${e.date}">${e.date}</time></li>`).join("")}</ul>`
        : `<p class="description">nothing here yet. check back soon.</p>`
      : "";
    const cta = m.cta && !m.inline
      ? `<p class="description"><a class="inline-link" href="${m.cta.href}" target="${/^https?:\/\//.test(m.cta.href) ? "_blank" : "_self"}" rel="noopener">${m.cta.label}</a></p>`
      : "";
    content.innerHTML = paragraphs + essays + cta;
  }

  function setRows() {
    track.innerHTML = S.menu.map((m) => `<span class="reel-item">${m.label}</span>`).join("");
    // size the viewport from the widest label (videos), not the one currently showing.
    const widest = Math.max(...[...track.children].map((el) => el.scrollWidth));
    const row = track.querySelector(".reel-item").getBoundingClientRect().height;
    windowEl.style.width = widest + 3 + "px";
    track.style.width = widest + 3 + "px";
    windowEl.style.height = row + "px";
    track.style.transform = `translateY(${-current * row}px)`;
  }

  function select(index) {
    index = Math.max(0, Math.min(S.menu.length - 1, index));
    if (busy || index === current) return;
    busy = true;
    [...nav.children].forEach((b, i) => b.setAttribute("aria-pressed", String(i === index)));
    const row = track.querySelector(".reel-item").getBoundingClientRect().height;
    track.style.transform = `translateY(${-index * row}px)`;
    renderSection(index);
    setTimeout(() => {
      current = index;
      busy = false;
    }, 760);
  }

  // the side panel: work and videos move their content in, life and email get their own
  const panel = document.getElementById("panel");
  const panelBody = document.getElementById("panelBody");
  const workMount = document.getElementById("work-mount");
  const videosMount = document.getElementById("videos-mount");
  let openIndex = null;

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function showPanel(i) {
    const m = S.menu[i];
    panelBody.innerHTML = "";
    workMount.hidden = true;
    videosMount.hidden = true;

    if (m.inline === true) {
      workMount.hidden = false;
      panelBody.appendChild(workMount);
    } else if (m.inline === "videos") {
      videosMount.hidden = false;
      panelBody.appendChild(videosMount);
    } else if (m.label === "email") {
      const a = m.cta.href;
      panelBody.innerHTML = `
        <h2 class="panel-title">email</h2>
        <p class="panel-text">send me a note, any time.</p>
        <a class="panel-mail" href="${esc(a)}">${esc(m.cta.label.replace(" ↗", ""))}</a>
        <button class="panel-copy" id="panelCopy" type="button">copy address</button>`;
      document.getElementById("panelCopy").addEventListener("click", (e) => {
        navigator.clipboard?.writeText(m.cta.label.replace(" ↗", ""));
        e.currentTarget.textContent = "copied";
      });
    } else if (m.label === "life") {
      panelBody.innerHTML = "";
    } else {
      panelBody.innerHTML = `<h2 class="panel-title">${esc(m.label)}</h2>` +
        m.description.split("\n").map((line) => `<p class="panel-text">${esc(line)}</p>`).join("");
    }

    panel.hidden = false;
    document.body.classList.add("panel-open");
    openIndex = i;
  }

  function closePanel() {
    panel.hidden = true;
    document.body.classList.remove("panel-open");
    workMount.hidden = true;
    videosMount.hidden = true;
    document.body.appendChild(workMount);
    document.body.appendChild(videosMount);
    openIndex = null;
  }

  function openTab(i) {
    if (openIndex === i) {          // the active tab closes its panel
      closePanel();
      return;
    }
    select(i);
    showPanel(i);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openIndex !== null) closePanel();
  });

  // build nav pills
  S.menu.forEach((m, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = m.label;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", () => openTab(i));
    nav.appendChild(b);
  });

  // build quick links
  (S.quickLinks || []).forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    a.textContent = l.label;
    if (/^https?:\/\//.test(l.href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    quickLinks.appendChild(a);
  });

  // wheel (desktop/trackpad)
  let acc = 0, lock = 0;
  window.addEventListener(
    "wheel",
    (e) => {
      if (document.body.classList.contains("panel-open")) return;
      e.preventDefault();
      const now = Date.now();
      acc += e.deltaY;
      if (now < lock) return;
      if (Math.abs(acc) > 30) {
        select(current + (acc > 0 ? 1 : -1));
        acc = 0;
        lock = now + 500;
      }
    },
    { passive: false }
  );

  // swipe (phones)
  let ty = null;
  window.addEventListener("touchstart", (e) => { ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    if (ty === null || S.menu[current].inline) return;
    const dy = ty - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 35) select(current + (dy > 0 ? 1 : -1));
    ty = null;
  });

  // keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); select(current + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); select(current - 1); }
  });

  window.addEventListener("resize", () => { if (!busy) setRows(); });

  renderSection(0);
  setRows();
})();
