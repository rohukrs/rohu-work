// how the site moves. to change words, links or images, edit content.js instead.
(function () {
  const S = window.SITE;
  const root = document.documentElement;
  const stage = document.getElementById("stage");
  const menu = document.getElementById("menu");
  const previews = document.getElementById("previews");
  const hint = document.getElementById("hint");

  root.style.setProperty("--bg", S.colors.background);
  root.style.setProperty("--fg", S.colors.text);
  document.getElementById("est").textContent = S.tagline;
  document.getElementById("name").textContent = S.name;
  document.getElementById("photo").src = S.photo;
  document.getElementById("photo").alt = S.name;

  let active = 0;
  let exploring = false;

  const items = S.menu.map((m, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "item";
    b.textContent = m.label;
    if (m.preview && m.preview.style === "icon") {
      const img = document.createElement("img");
      img.className = "icon";
      img.src = m.preview.image;
      img.alt = "";
      b.appendChild(img);
    }
    b.addEventListener("click", () => {
      if (exploring && i === active) open(m.link);
      else select(i);
    });
    menu.appendChild(b);

    if (m.preview && m.preview.style !== "icon") {
      const p = document.createElement("img");
      p.className = "preview " + m.preview.style;
      p.src = m.preview.image;
      p.alt = "";
      p.dataset.i = i;
      previews.appendChild(p);
    }
    return b;
  });

  function render() {
    stage.classList.toggle("exploring", exploring);
    menu.style.setProperty("--active", active);
    items.forEach((b, i) => {
      b.classList.toggle("active", i === active);
      b.classList.toggle("far", Math.abs(i - active) > 2);
      b.setAttribute("aria-current", i === active ? "true" : "false");
    });
    previews.querySelectorAll(".preview").forEach((p) => {
      p.classList.toggle("show", exploring && Number(p.dataset.i) === active);
    });
  }

  function select(i) {
    active = Math.max(0, Math.min(items.length - 1, i));
    exploring = true;
    hint.classList.add("gone");
    render();
  }

  function home() {
    active = 0;
    exploring = false;
    render();
  }

  function step(d) {
    select(exploring ? active + d : (d > 0 ? 1 : 0));
  }

  function open(link) {
    if (!link || link === "#") return;
    if (/^https?:\/\//.test(link)) window.open(link, "_blank", "noopener");
    else window.location.href = link;
  }

  document.getElementById("name").addEventListener("click", home);

  // scroll wheel and trackpad
  let acc = 0, lock = 0;
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const now = Date.now();
    acc += e.deltaY;
    if (now < lock) return;
    if (Math.abs(acc) > 30) {
      step(acc > 0 ? 1 : -1);
      acc = 0;
      lock = now + 380;
    }
  }, { passive: false });

  // swipe on phones
  let ty = null;
  window.addEventListener("touchstart", (e) => { ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    if (ty === null) return;
    const dy = ty - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 35) step(dy > 0 ? 1 : -1);
    ty = null;
  });

  // keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
    else if (e.key === "Escape") home();
    else if (e.key === "Enter" && exploring && document.activeElement === document.body) open(S.menu[active].link);
  });

  // scale the figma canvas to fit any screen
  function fit() {
    const cs = getComputedStyle(root);
    const sw = parseFloat(cs.getPropertyValue("--sw"));
    const sh = parseFloat(cs.getPropertyValue("--sh"));
    const k = Math.min(window.innerWidth / sw, window.innerHeight / sh);
    stage.style.transform = `scale(${k})`;
    stage.style.left = (window.innerWidth - sw * k) / 2 + "px";
    stage.style.top = (window.innerHeight - sh * k) / 2 + "px";
    stage.classList.add("ready");
  }
  window.addEventListener("resize", fit);

  render();
  fit();
})();
