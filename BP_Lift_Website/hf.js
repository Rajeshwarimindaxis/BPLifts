document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  const backTop = document.querySelector(".back-top");
  if (backTop) {
    const update = () => backTop.classList.toggle("visible", window.scrollY > 350);
    window.addEventListener("scroll", update, { passive: true });
    update();
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Demo-only form handler. Connect to an email/CRM backend before publishing.
  document.querySelectorAll(".quote-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thank you for contacting BP lifts. Please connect this form to your email or backend before going live.");
      form.reset();
    });
  });
});
