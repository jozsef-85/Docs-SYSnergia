(function () {
  const root = document.documentElement;
  const header = document.querySelector(".md-header");
  const tabs = document.querySelector(".md-tabs");
  const revealTargets = document.querySelectorAll("[data-reveal]");

  function syncScrollState() {
    const scrolled = window.scrollY > 18;
    if (header) header.dataset.scrolled = String(scrolled);
    if (tabs) tabs.dataset.scrolled = String(scrolled);
    root.classList.toggle("is-scrolled", scrolled);
  }

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((node) => {
      node.classList.add("sys-reveal");
      observer.observe(node);
    });
  } else {
    revealTargets.forEach((node) => node.classList.add("is-visible"));
  }

  syncScrollState();
  window.addEventListener("scroll", syncScrollState, { passive: true });
})();
