// Mobile menu: a <button aria-expanded aria-controls> toggles a panel.
// Closes on Escape and when a link inside it is clicked.
const button = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const panel = document.querySelector<HTMLElement>("[data-nav-panel]");

if (button && panel) {
  const setOpen = (open: boolean) => {
    button.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("hidden", !open);
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      button.focus();
    }
  });

  panel.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  });
}

// Desktop "Solutions" mega menu: button toggles a panel; Escape / outside click / focus-out close it.
const dropdown = document.querySelector<HTMLElement>("[data-dropdown]");
const toggle = dropdown?.querySelector<HTMLButtonElement>(
  "[data-dropdown-toggle]",
);
const menu = dropdown?.querySelector<HTMLElement>("[data-dropdown-panel]");

if (dropdown && toggle && menu) {
  const setMenu = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
  };
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target as Node)) setMenu(false);
  });
  dropdown.addEventListener("focusout", (event) => {
    if (!dropdown.contains(event.relatedTarget as Node | null)) setMenu(false);
  });
}
