// ================================================================
// Blog pagination — client-side paginated post list
// Extracted from landing.js getBlogPaginationScript()
// Reads post data from window.__BLOG_POSTS
// ================================================================
(function() {
  'use strict';

  var ALL_POSTS = window.__BLOG_POSTS || [];
  if (!ALL_POSTS || ALL_POSTS.length === 0) {
    var el = document.getElementById("blogList");
    if (el) el.innerHTML = '<p style="padding:40px 0;text-align:center;color:#8e8b82;font-family:Inter,sans-serif;">暂无文章</p>';
    return;
  }

  var STORAGE_PAGESIZE = "blog_pageSize";
  var savedSize = parseInt(localStorage.getItem(STORAGE_PAGESIZE), 10);
  var validSizes = [5, 10, 20, 50];
  var defaultSize = validSizes.indexOf(savedSize) >= 0 ? savedSize : 10;
  var state = { page: 1, pageSize: defaultSize };
  var listEl = document.getElementById("blogList");
  var prevBtn = document.getElementById("pagPrevBtn");
  var nextBtn = document.getElementById("pagNextBtn");
  var sizeSelect = document.getElementById("pagSizeSelect");
  var jumpInput = document.getElementById("pagJumpInput");
  var jumpBtn = document.getElementById("pagJumpBtn");
  var currentEl = document.getElementById("pagCurrent");
  var totalEl = document.getElementById("pagTotal");
  var rangeEl = document.getElementById("pagRange");
  var errorEl = document.getElementById("pagError");

  function totalPages() { return Math.max(1, Math.ceil(ALL_POSTS.length / state.pageSize)); }

  function esc(s) { return String(s||"").replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); }

  function tagColor(name) {
    var palette = ["#cc785c","#4a90a4","#6b8e5e","#8b6bb5","#c4915e","#5b8fa8","#a36b7c","#7a8b5e","#8e6ba8","#5e8b8b","#b07a4a","#6a7fb5","#8b5e6b","#5e8b6a","#9b7b5e","#5e6b8b","#8b8b5e","#7b5e8b","#5e8b7b","#8b5e5e","#c47a5c","#4a919b","#6ea06e","#9b70b8","#c99b5e","#5b95a8","#a37b90","#7a9b5e","#8e7ba8","#5e9b8b","#b07a5a","#6a8fb5","#8b6e7b","#5e9b6a","#9b8b5e","#5e7b8b","#8b9b5e","#7b8e5e","#5e8b8e","#8b6e5e"];
    var hash = 0, t = String(name||"");
    for (var i = 0; i < t.length; i++) hash = t.charCodeAt(i) + ((hash << 5) - hash);
    return palette[Math.abs(hash) % palette.length];
  }

  function renderCard(post) {
    var tagsHtml = "";
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(function(tag) {
        var c = tagColor(tag);
        tagsHtml += '<span class="blog-card-tag" style="color:' + c + ';border-color:' + c + '33">' + esc(tag) + '</span>';
      });
    } else {
      tagsHtml = '<span class="blog-card-tag-empty">无标签</span>';
    }
    return '<a href="/' + esc(post.path) + '" class="blog-card">' +
      '<div class="blog-card-title">' + esc(post.title) + '</div>' +
      '<div class="blog-card-footer">' +
        '<div class="blog-card-tags">' + tagsHtml + '</div>' +
        '<span class="blog-card-words">' + esc(post.words) + '</span>' +
      '</div>' +
    '</a>';
  }

  var dateHeadingStyle = "grid-column:1/-1;font-family:Playfair Display,Georgia,serif;font-size:20px;font-weight:600;margin:8px 0 4px;padding-bottom:8px;border-bottom:1px solid #e6dfd8;";
  var pinnedLabelStyle = "grid-column:1/-1;font-family:JetBrains Mono,monospace;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:#cc785c;margin-bottom:-8px;display:flex;align-items:center;gap:8px;";
  var pinnedDot = '<span style="display:inline-block;width:8px;height:8px;background:#cc785c;border-radius:50%;"></span>';

  function renderPage() {
    var tp = totalPages();
    if (state.page > tp) state.page = tp;
    var start = (state.page - 1) * state.pageSize;
    var end = Math.min(start + state.pageSize, ALL_POSTS.length);
    var pagePosts = ALL_POSTS.slice(start, end);
    var html = "";
    var hasPinned = pagePosts.some(function(p) { return p.pinned; });
    var curDate = null;
    pagePosts.forEach(function(post) {
      if (hasPinned && post.pinned) {
        if (curDate !== "__pinned__") {
          html += '<div style="' + pinnedLabelStyle + '">' + pinnedDot + '置顶</div>';
          curDate = "__pinned__";
        }
      } else if (!post.pinned) {
        if (curDate === "__pinned__") curDate = null;
        if (post.date !== curDate) {
          html += '<div style="' + dateHeadingStyle + '">' + esc(post.date) + '</div>';
          curDate = post.date;
        }
      }
      html += renderCard(post);
    });

    listEl.innerHTML = '<div class="blog-cards">' + html + '</div>';
    listEl.classList.remove("fading");

    currentEl.textContent = state.page;
    totalEl.textContent = tp;
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= tp;
    rangeEl.textContent = "显示 " + (start + 1) + "-" + end + " 条，共 " + ALL_POSTS.length + " 条";
    jumpInput.value = state.page;
    jumpInput.classList.remove("invalid");
    errorEl.classList.remove("show");
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
    jumpInput.classList.add("invalid");
    clearTimeout(errorEl._t);
    errorEl._t = setTimeout(function() { errorEl.classList.remove("show"); }, 2500);
  }

  function changePage(newPage) {
    var tp = totalPages();
    if (newPage < 1 || newPage > tp) return;
    listEl.classList.add("fading");
    setTimeout(function() { state.page = newPage; renderPage(); }, 180);
  }

  if (prevBtn) prevBtn.addEventListener("click", function() { changePage(state.page - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function() { changePage(state.page + 1); });

  if (sizeSelect) {
    sizeSelect.addEventListener("change", function() {
      state.pageSize = parseInt(sizeSelect.value, 10) || 10;
      state.page = 1;
      localStorage.setItem(STORAGE_PAGESIZE, state.pageSize);
      listEl.classList.add("fading");
      setTimeout(renderPage, 180);
    });
  }

  function doJump() {
    var raw = jumpInput.value.trim();
    if (!/^\d+$/.test(raw)) { showError("没有该页面"); return; }
    var n = parseInt(raw, 10);
    var tp = totalPages();
    if (n < 1 || n > tp) { showError("没有该页面"); return; }
    changePage(n);
  }

  if (jumpBtn) jumpBtn.addEventListener("click", doJump);
  if (jumpInput) {
    jumpInput.addEventListener("keydown", function(e) { if (e.key === "Enter") doJump(); });
    jumpInput.addEventListener("input", function() { jumpInput.classList.remove("invalid"); errorEl.classList.remove("show"); });
  }

  document.addEventListener("keydown", function(e) {
    var tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "ArrowLeft" && state.page > 1) changePage(state.page - 1);
    if (e.key === "ArrowRight" && state.page < totalPages()) changePage(state.page + 1);
  });

  if (sizeSelect) sizeSelect.value = defaultSize;
  renderPage();
})();
