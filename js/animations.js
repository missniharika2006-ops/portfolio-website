(() => {
  const loader = document.querySelector(".page-loader");
  const revealItems = document.querySelectorAll(".reveal");
  const skillCards = document.querySelectorAll(".skill-card");

  const finishLoading = () => {
    if (!loader) return;
    loader.classList.add("loaded");
    document.body.classList.remove("loading");
  };

  document.body.classList.add("loading");
  window.addEventListener("load", () => window.setTimeout(finishLoading, 250), { once: true });
  window.setTimeout(finishLoading, 1400);

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    skillCards.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  revealItems.forEach((item) => observer.observe(item));
  skillCards.forEach((item) => observer.observe(item));
})();
