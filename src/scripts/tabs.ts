// Accessible tabs: roving tabindex, arrow keys / Home / End, aria-selected + hidden panels.
document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>("[role='tab']"));
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[role='tabpanel']"),
  );

  const select = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i]?.classList.toggle("hidden", !on);
    });
    if (focus) tabs[index]?.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      const next: Record<string, number> = {
        ArrowRight: i === last ? 0 : i + 1,
        ArrowLeft: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      };
      if (event.key in next) {
        event.preventDefault();
        select(next[event.key], true);
      }
    });
  });
  select(0);
});
