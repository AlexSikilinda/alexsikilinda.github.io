/* Table of contents behaviour. The list works without this file — these are
   anchor links to ids kramdown already emits. This adds two things:
   collapsing on narrow screens, and telling the reader where they are. */
(function () {
  const toc = document.querySelector(".toc");
  if (!toc) return;

  const links = [...toc.querySelectorAll(".toc-item a")];
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter(Boolean);
  if (!targets.length) return;

  /* Open on desktop where the column is otherwise empty; collapsed on narrow
     screens, where the sidebar sits above the article and an expanded list
     would push the post itself off the first screen. */
  const wide = window.matchMedia("(min-width: 58rem)");
  const sync = () => { toc.open = wide.matches; };
  sync();
  wide.addEventListener("change", sync);

  /* Which section is being read. Intersection ratios alone are unreliable for
     sections taller than the viewport, so track the last heading scrolled
     past against a line a quarter of the way down the screen. */
  let current = null;
  const setCurrent = (id) => {
    if (id === current) return;
    current = id;
    links.forEach((a) => {
      const on = decodeURIComponent(a.hash.slice(1)) === id;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  };

  const update = () => {
    const line = window.scrollY + window.innerHeight * 0.25;
    let active = targets[0];
    for (const t of targets) {
      if (t.getBoundingClientRect().top + window.scrollY <= line) active = t;
      else break;
    }
    setCurrent(active.id);
  };

  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  };

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  update();
})();
