import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Ported from the Webflow template's two interactions:
    1. "Nav on page load": nav scales 0.9 -> 1 while fading in (0.6s).
    2. "All sections on scroll": when a .section / footer reaches "top 80%" it plays once:
       eyebrows scale in, headings scale in word by word, large elements (cards, grids,
       lists) and small elements (button groups, logos) stagger in, dividers fade in last.
  All of it is transform + opacity only, and skipped for reduced-motion users.
*/

const EASE = "power2.out";

/** Elements of a given selector inside `root`, minus anything inside `excludeSelector`. */
function pick(
  root: Element,
  selector: string,
  excludeSelector?: string,
): HTMLElement[] {
  return gsap.utils
    .toArray<HTMLElement>(root.querySelectorAll(selector))
    .filter((el) => !excludeSelector || !el.closest(excludeSelector));
}

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // 1. Nav on page load. Template waits 1.2s (behind its hero intro); shortened to 0.3s
  //    so navigation is never invisible for over a second.
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (nav) {
    gsap.from(nav, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.6,
      delay: 0.3,
      ease: EASE,
    });
  }

  // 2. Sections on scroll
  const splits: SplitText[] = [];

  gsap.utils
    .toArray<HTMLElement>(".section, .footer-section")
    .forEach((section) => {
      const eyebrows = pick(section, "[data-ix='eyebrow']");
      const headings = pick(
        section,
        "h1, h2, [data-ix='heading'], [data-ix='lead']",
        ".card, [data-ix='large'], [data-ix='small']",
      );
      const large = pick(
        section,
        "[data-ix='large']",
        "[data-ix='large'] [data-ix='large']",
      );
      const small = pick(section, "[data-ix='small']");
      const dividers = pick(section, "[data-ix='divider']");

      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });

      if (eyebrows.length) {
        tl.from(
          eyebrows,
          { autoAlpha: 0, scale: 0.9, duration: 0.8, stagger: { amount: 0.8 } },
          0,
        );
      }

      if (headings.length) {
        // aria-label is only valid on elements with a role (headings), not on <p>
        const words = headings.flatMap((el) => {
          const split = SplitText.create(el, {
            type: "words",
            aria: el.matches("h1, h2, h3, h4, h5, h6") ? "auto" : "none",
          });
          splits.push(split);
          return split.words as HTMLElement[];
        });
        tl.from(
          words,
          { autoAlpha: 0, scale: 0.9, duration: 0.8, stagger: { amount: 0.8 } },
          0,
        );
      }

      if (large.length) {
        tl.from(
          large,
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.7,
            stagger: { each: 0.15 },
            // Hand the transform back to CSS so card hover lift keeps working
            clearProps: "opacity,visibility,transform",
          },
          0.6,
        );
      }

      if (small.length) {
        tl.from(
          small,
          {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.7,
            stagger: { each: 0.15 },
            clearProps: "opacity,visibility,transform",
          },
          0.6,
        );
      }

      if (dividers.length) {
        tl.from(
          dividers,
          { autoAlpha: 0, duration: 0.75, ease: "power1.out" },
          1.2,
        );
      }
    });

  // 3. Pipeline: steps light up in sequence as the row scrolls in
  gsap.utils.toArray<HTMLElement>("[data-pipeline]").forEach((row) => {
    const steps = row.querySelectorAll<HTMLElement>("[data-step]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: "top 75%", once: true },
    });
    steps.forEach((step, i) =>
      tl.add(() => step.classList.add("is-lit"), 1 + i * 0.35),
    );
  });

  // Undo the word wrappers when the media query stops matching (user turns on reduced motion)
  return () => splits.forEach((s) => s.revert());
});
