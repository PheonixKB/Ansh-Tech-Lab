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
