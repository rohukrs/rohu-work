// the homepage stamp: it lifts and tilts toward the cursor, the eyes follow it, and a tap makes them pop.
// the eyes are small dark pupils laid over the portrait, so only the eyes move; the rest of the image stays put.
(function () {
  const wrap = document.getElementById("stampWrap");
  if (!wrap) return;

  const pupils = [wrap.querySelector(".pupil-l"), wrap.querySelector(".pupil-r")];
  // eye centres as fractions of the stamp, matching the css positions
  const eyeAt = [[0.4086, 0.7362], [0.5875, 0.7279]];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const aim = [{ x: 0, y: 0 }, { x: 0, y: 0 }];   // where each eye wants to look (unit-ish vector)
  const pos = [{ x: 0, y: 0 }, { x: 0, y: 0 }];   // where each eye is now (eased)
  const tilt = { x: 0, y: 0 };
  const tiltTo = { x: 0, y: 0 };
  let raf = 0;
  let popTimer = 0;

  function schedule() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function frame() {
    raf = 0;
    const travel = wrap.offsetWidth * 0.005; // eyes move a fraction of the stamp width, so they stay inside the iris
    let moving = false;

    pupils.forEach((p, i) => {
      const goalX = aim[i].x * travel;
      const goalY = aim[i].y * travel;
      pos[i].x += (goalX - pos[i].x) * 0.2;
      pos[i].y += (goalY - pos[i].y) * 0.2;
      if (Math.abs(goalX - pos[i].x) > 0.02 || Math.abs(goalY - pos[i].y) > 0.02) moving = true;
      p.style.setProperty("--x", pos[i].x.toFixed(2) + "px");
      p.style.setProperty("--y", pos[i].y.toFixed(2) + "px");
    });

    tilt.x += (tiltTo.x - tilt.x) * 0.12;
    tilt.y += (tiltTo.y - tilt.y) * 0.12;
    if (Math.abs(tiltTo.x - tilt.x) > 0.01 || Math.abs(tiltTo.y - tilt.y) > 0.01) moving = true;
    wrap.style.setProperty("--rx", tilt.x.toFixed(2) + "deg");
    wrap.style.setProperty("--ry", tilt.y.toFixed(2) + "deg");

    if (moving) schedule();
  }

  function onMove(e) {
    const r = wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    // the whole stamp tilts a few degrees toward the cursor
    tiltTo.x = -((e.clientY - cy) / (r.height / 2)) * 3;
    tiltTo.y = ((e.clientX - cx) / (r.width / 2)) * 3;

    // each eye looks at the cursor on its own
    eyeAt.forEach(([fx, fy], i) => {
      const ex = r.left + r.width * fx;
      const ey = r.top + r.height * fy;
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
      const d = Math.hypot(dx, dy) || 1;
      const strength = Math.min(1, d / 220); // looks harder when the cursor is close
      aim[i] = { x: (dx / d) * strength, y: (dy / d) * strength };
    });
    schedule();
  }

  function onLeave() {
    aim[0] = { x: 0, y: 0 };
    aim[1] = { x: 0, y: 0 };
    tiltTo.x = 0;
    tiltTo.y = 0;
    schedule();
  }

  function onTap() {
    if (reduce.matches) return;
    wrap.classList.remove("is-surprised");
    void wrap.offsetWidth; // restart the animation on repeat taps
    wrap.classList.add("is-surprised");
    clearTimeout(popTimer);
    popTimer = setTimeout(() => wrap.classList.remove("is-surprised"), 850);
  }

  if (!reduce.matches) {
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
  }
  wrap.addEventListener("click", onTap);

  // tidy up when the page goes away
  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(raf);
    clearTimeout(popTimer);
    wrap.removeEventListener("pointermove", onMove);
    wrap.removeEventListener("pointerleave", onLeave);
    wrap.removeEventListener("click", onTap);
  });
})();
