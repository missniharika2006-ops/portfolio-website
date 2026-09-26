(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeButton = document.querySelector(".theme-toggle");
  const backToTop = document.querySelector(".back-to-top");
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const year = String(new Date().getFullYear());

  document.querySelectorAll("#year, #footer-year").forEach((element) => {
    element.textContent = year;
  });

  const storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme === "dark") document.body.classList.add("dark-theme");

  const updateThemeButton = () => {
    if (!themeButton) return;
    const dark = document.body.classList.contains("dark-theme");
    themeButton.innerHTML = dark
      ? '<i class="fa-regular fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';
    themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  };
  updateThemeButton();

  themeButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeButton();
  });

  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation menu");
    if (menuButton) menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  const updateBackToTop = () => {
    backToTop?.classList.toggle("visible", window.scrollY > 520);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
