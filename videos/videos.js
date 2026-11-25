// the /videos page. add a video by setting its youtube id (the part after v= in the link).
// leave youtube as "" until you have the link: the tile shows a placeholder.
(function () {
  const videos = [
    { title: "dal chawal aur ghar", youtube: "" },
    { title: "founder's dilemma", youtube: "" },
    { title: "job search", youtube: "" },
    { title: "art of slowing", youtube: "" },
  ];

  const esc = (s) => { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; };

  const tile = (v) => {
    if (!v.youtube) {
      return `
        <figure class="vid">
          <div class="vid-frame vid-empty"><span>add the youtube id for "${esc(v.title)}" in videos/videos.js</span></div>
          <figcaption><span class="vid-title">${esc(v.title)}</span></figcaption>
        </figure>`;
    }
    return `
      <figure class="vid">
        <div class="vid-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.youtube)}" title="${esc(v.title)}" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
        <figcaption><a class="vid-title" href="https://www.youtube.com/watch?v=${esc(v.youtube)}" target="_blank" rel="noopener">${esc(v.title)}<span class="arc-arrow" aria-hidden="true">↗</span></a></figcaption>
      </figure>`;
  };

  document.getElementById("videos-mount").innerHTML = `
    <section class="arc-section sel-top">
      <h1 class="page-title">videos</h1>
      <p class="arc-note">films, experiments and stories in moving images.</p>
      <div class="vgrid">${videos.map(tile).join("")}</div>
    </section>`;
})();
