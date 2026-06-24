// ================================================================
// Changelog page — filter & search
// ================================================================
(function() {
  'use strict';
  var entries = document.querySelectorAll(".changelog-entry");
  var filterBtns = document.querySelectorAll(".changelog-filter-btn");
  var searchInput = document.getElementById("changelogSearch");
  var emptyState = document.getElementById("changelogEmpty");
  var activeFilter = "all";
  var query = "";

  function applyFilters() {
    var visibleCount = 0;
    entries.forEach(function(e) {
      var cats = (e.getAttribute("data-categories") || "").split(" ");
      var text = (e.textContent || "").toLowerCase();
      var matchCat = activeFilter === "all" || cats.indexOf(activeFilter) >= 0;
      var matchSearch = !query || text.indexOf(query.toLowerCase()) >= 0;
      if (matchCat && matchSearch) { e.classList.add("changelog-entry--visible"); visibleCount++; }
      else { e.classList.remove("changelog-entry--visible"); }
    });
    if (emptyState) emptyState.style.display = visibleCount === 0 ? "" : "none";
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      filterBtns.forEach(function(b) { b.classList.remove("changelog-filter-btn--active"); });
      btn.classList.add("changelog-filter-btn--active");
      activeFilter = btn.getAttribute("data-filter");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function() {
      query = searchInput.value;
      applyFilters();
    });
  }
})();
