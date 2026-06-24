// ================================================================
// Hamburger Menu — Mobile navigation toggle
// Extracted from landing.js getHamburgerMenuScript()
// ================================================================
function toggleMobileMenu() {
  var btn = document.getElementById("hamburgerBtn");
  var navLinks = document.querySelector(".nav-links");
  var overlay = document.getElementById("mobileMenuOverlay");
  var isOpen = btn.classList.toggle("active");
  navLinks.classList.toggle("mobile-open", isOpen);
  if (overlay) overlay.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

document.addEventListener("click", function(e) {
  var btn = document.getElementById("hamburgerBtn");
  var navLinks = document.querySelector(".nav-links");
  var overlay = document.getElementById("mobileMenuOverlay");
  if (btn && navLinks && navLinks.classList.contains("mobile-open")) {
    if (!btn.contains(e.target) && !navLinks.contains(e.target)) {
      btn.classList.remove("active");
      navLinks.classList.remove("mobile-open");
      if (overlay) overlay.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
});
