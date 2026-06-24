// ================================================================
// Reading progress bar + Back to top button
// Extracted from buildArticlePage in landing.js
// ================================================================
(function() {
  var bar = document.getElementById("readingProgress");
  var btt = document.getElementById("backToTopBtn");
  if (!bar && !btt) return;
  var ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (bar) bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + "%" : "0%";
        if (btt) btt.classList.toggle("back-to-top--show", scrollTop > 400);
        ticking = false;
      });
      ticking = true;
    }
  });
  if (btt) {
    btt.addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

// Word count (client-side, for Chinese characters)
(function() {
  var el = document.getElementById("articleWordCount");
  if (!el) return;
  var body = document.querySelector(".article-body");
  if (!body) return;
  var text = body.textContent || "";
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0x4e00 && c <= 0x9fff) count++;
  }
  if (count > 0) {
    el.textContent = count + " 字";
  }
})();
