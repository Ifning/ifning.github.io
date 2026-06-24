// ================================================================
// Avatar bounce animation for homepage hero
// Extracted from landing.js getAvatarBounceScript()
// ================================================================
(function() {
  var avatar = document.querySelector(".hero-avatar");
  if (!avatar) return;
  var isTouch = "ontouchstart" in window;
  var ready = false;

  function onJourneyEnd() {
    ready = true;
    if (!isTouch) avatar.addEventListener("mouseenter", bounce);
  }

  avatar.addEventListener("animationend", function(e) {
    if (e.animationName === "avatar-journey" || e.animationName === "avatar-rise-mobile") {
      onJourneyEnd();
    }
  });

  // Fallback: enable after 1.2s in case animationend didn't fire
  setTimeout(onJourneyEnd, 1200);

  function bounce() {
    if (!ready) return;
    if (avatar.classList.contains("bouncing")) return;
    avatar.style.animation = "";
    avatar.style.transform = "";
    avatar.classList.add("bouncing");
    avatar.addEventListener("animationend", function cleanup() {
      avatar.classList.remove("bouncing");
      avatar.removeEventListener("animationend", cleanup);
      if (window.innerWidth > 767) {
        avatar.style.transform = "translate(calc(-50% - 140px), -50%)";
      }
      avatar.style.animation = "none";
    }, { once: true });
  }

  if (isTouch) {
    avatar.addEventListener("click", bounce);
  }
})();
