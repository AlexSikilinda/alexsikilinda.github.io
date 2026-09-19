/* WCAG 2.1.1 — several code blocks overflow horizontally, and with
   `overflow-x: auto` and no tabindex there is no way to scroll them without a
   pointer. Rouge's output is generated at build time, so the attributes are
   applied here instead. */
document.querySelectorAll("pre").forEach((el, i) => {
  el.setAttribute("tabindex", "0");
  el.setAttribute("role", "region");
  el.setAttribute("aria-label", `Code sample ${i + 1}`);
});
