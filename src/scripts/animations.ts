import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  CSS-based scroll reveals (CSP-safe). GSAP is kept only for:
  - Pipeline step highlight (toggles CSS class)
  - Diagram draw-in (could be CSS but GSAP gives more control)
  - Count-up numbers
  All animations respect prefers-reduced-motion via matchMedia.
*/

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // 1. Nav on page load
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (nav) {
    gsap.from(nav, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });
  }

  // 2. Scroll reveals using IntersectionObserver + CSS classes
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  // Simple reveal elements
  document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // Stagger groups
  document.querySelectorAll<HTMLElement>(".stagger-group").forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(".stagger-item");
    items.forEach((item, index) => {
      item.style.setProperty("--stagger-index", String(index));
    });
    revealObserver.observe(group);
  });

  // 3. Count-up numbers
  const countUpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const end = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          let current = 0;
          const duration = 1400;
          const startTime = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            current = Math.round(eased * end);
            el.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          el.classList.add("is-visible");
          requestAnimationFrame(animate);
          countUpObserver.unobserve(el);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.5 },
  );

  document.querySelectorAll<HTMLElement>(".count-up").forEach((el) => {
    el.textContent = "0" + (el.dataset.suffix ?? "");
    countUpObserver.observe(el);
  });

  // 4. Diagram draw-in (SVG stroke animation via CSS)
  const diagramObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const svg = entry.target as SVGSVGElement;
          // Set path lengths for CSS variables
          svg.querySelectorAll<SVGGeometryElement>(".draw").forEach((path) => {
            const len = path.getTotalLength();
            path.style.setProperty("--path-length", String(len));
          });
          svg.classList.add("is-visible");
          diagramObserver.unobserve(svg);
        }
      });
    },
    { rootMargin: "0px 0px -20% 0px", threshold: 0.2 },
  );

  document.querySelectorAll<SVGSVGElement>(".diagram-draw").forEach((svg) => {
    diagramObserver.observe(svg);
  });

  // 5. Pipeline: steps light up in sequence as the row scrolls in
  gsap.utils.toArray<HTMLElement>("[data-pipeline]").forEach((row) => {
    const steps = row.querySelectorAll<HTMLElement>("[data-step]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: "top 75%", once: true },
    });
    steps.forEach((step, i) =>
      tl.add(() => step.classList.add("is-lit"), 1 + i * 0.35),
    );
  });
});
