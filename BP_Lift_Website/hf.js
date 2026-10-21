document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
    // Close mobile nav when clicking a leaf link (excluding the dropdown toggle)
    nav.querySelectorAll("a:not(.nav-dropdown-toggle)").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  // Handle dropdown toggling on mobile / touch
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (dropdownToggle) {
      dropdownToggle.addEventListener("click", (e) => {
        // On mobile viewports, toggle the accordion dropdown instead of direct navigation
        if (window.innerWidth <= 920) {
          e.preventDefault();
          const wasOpen = dropdown.classList.contains("dropdown-open");
          // Close other dropdowns
          dropdowns.forEach(d => {
            d.classList.remove("dropdown-open");
            const btn = d.querySelector(".nav-dropdown-toggle");
            if (btn) btn.setAttribute("aria-expanded", "false");
          });
          if (!wasOpen) {
            dropdown.classList.add("dropdown-open");
            dropdownToggle.setAttribute("aria-expanded", "true");
          }
        }
      });
    }
  });

  // Close open dropdowns if user clicks outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      dropdowns.forEach(d => {
        d.classList.remove("dropdown-open");
        const btn = d.querySelector(".nav-dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Close dropdown on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach(d => {
        d.classList.remove("dropdown-open");
        const btn = d.querySelector(".nav-dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  });

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
