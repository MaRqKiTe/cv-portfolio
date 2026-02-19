(function () {
  const root = document.documentElement;

  // year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // theme
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.setAttribute("data-theme", "light");

  function applyTheme() {
    const isLight = root.getAttribute("data-theme") === "light";
    if (themeToggle) themeToggle.textContent = isLight ? "☀" : "◐";
  }
  applyTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      applyTheme();
    });
  }

  // mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => mobileNav.classList.toggle("is-open"));
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileNav.classList.remove("is-open"));
    });
  }

  // form validation demo
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");
  if (form && hint) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const msg = String(data.get("message") || "").trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (name.length < 2) return void (hint.textContent = "⚠ Nombre inválido.");
      if (!emailOk) return void (hint.textContent = "⚠ Email inválido.");
      if (msg.length < 10) return void (hint.textContent = "⚠ Mensaje muy corto.");

      hint.textContent = "✅ Validado. (Demo) Aquí se enviaría a un backend real.";
      form.reset();
    });
  }
})();
