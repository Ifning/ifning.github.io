// ================================================================
// Tags page — full client-side rendering
// Extracted from buildTagsPage in landing.js
// ================================================================
(function() {
  var data = window.__TAGS_DATA;
  if (!data) return;
  var tagMap = data.tagMap || {};
  var noTagPosts = data.noTagPosts || [];
  var totalPosts = data.totalPosts || 0;

  var tagColors = ["#cc785c","#4a90a4","#6b8e5e","#8b6bb5","#c4915e","#5b8fa8","#a36b7c","#7a8b5e","#8e6ba8","#5e8b8b","#b07a4a","#6a7fb5","#8b5e6b","#5e8b6a","#9b7b5e","#5e6b8b","#8b8b5e","#7b5e8b","#5e8b7b","#8b5e5e","#c47a5c","#4a919b","#6ea06e","#9b70b8","#c99b5e","#5b95a8","#a37b90","#7a9b5e","#8e7ba8","#5e9b8b","#b07a5a","#6a8fb5","#8b6e7b","#5e9b6a","#9b8b5e","#5e7b8b","#8b9b5e","#7b8e5e","#5e8b8e","#8b6e5e"];
  function getTagColor(tag) {
    var hash = 0;
    for (var i = 0; i < tag.length; i++) { hash = tag.charCodeAt(i) + ((hash << 5) - hash); }
    return tagColors[Math.abs(hash) % tagColors.length];
  }

  function esc(s) { return String(s||"").replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]}); }

  function renderTagCard(post) {
    var tagsHtml = "";
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(function(tag) {
        var c = getTagColor(tag);
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

  function renderTagGroup(posts) {
    var html = '<div class="blog-cards">';
    posts.forEach(function(p) { html += renderTagCard(p); });
    html += '</div>';
    return html;
  }

  // ---- Build tag selector pills ----
  var tagNames = Object.keys(tagMap).sort(function(a, b) { return tagMap[b].length - tagMap[a].length; });
  var selectorEl = document.getElementById("tagSelector");
  var hasNoTag = noTagPosts.length > 0;

  var pillsHTML = '<button class="tags-pill tags-pill-active" data-tag="all" onclick="switchTag(\'all\')">全部<span class="tags-pill-count">' + totalPosts + '</span></button>';
  tagNames.forEach(function(tag) {
    if (tag === 'NoChar') return;
    var color = getTagColor(tag);
    pillsHTML += '<button class="tags-pill" data-tag="' + tag + '" style="--tag-color:' + color + '" onclick="switchTag(\'' + tag.replace(/'/g, "\\'") + '\')">' + tag + '<span class="tags-pill-count">' + tagMap[tag].length + '</span></button>';
  });
  if (hasNoTag) {
    pillsHTML += '<button class="tags-pill" data-tag="__notag__" onclick="switchTag(\'__notag__\')">无标签<span class="tags-pill-count">' + noTagPosts.length + '</span></button>';
  }
  if (selectorEl) selectorEl.innerHTML = pillsHTML;

  // ---- Build "all" view ----
  var allEl = document.getElementById("tagAll");
  if (allEl) {
    var allHTML = '';
    tagNames.forEach(function(tag) {
      if (tag === 'NoChar') return;
      allHTML += '<div class="tags-group"><h2 class="tags-group-header">' + tag + ' <span class="tags-group-count">' + tagMap[tag].length + '</span></h2>' + renderTagGroup(tagMap[tag]) + '</div>';
    });
    if (hasNoTag) {
      allHTML += '<div class="tags-group"><h2 class="tags-group-header">无标签 <span class="tags-group-count">' + noTagPosts.length + '</span></h2>' + renderTagGroup(noTagPosts) + '</div>';
    }
    allEl.innerHTML = allHTML;
  }

  // ---- Build individual tag views ----
  tagNames.forEach(function(tag) {
    if (tag === 'NoChar') return;
    var safeId = "tag-" + tag.replace(/[^a-zA-Z0-9一-鿿]/g, '_');
    if (!document.getElementById(safeId)) {
      var div = document.createElement("div");
      div.id = safeId;
      div.style.display = "none";
      document.querySelector(".tags-page").appendChild(div);
    }
    var el = document.getElementById(safeId);
    if (el) {
      el.innerHTML = '<div class="tags-group"><h2 class="tags-group-header">' + tag + ' <span class="tags-group-count">' + tagMap[tag].length + '</span></h2>' + renderTagGroup(tagMap[tag]) + '</div>';
    }
  });

  if (hasNoTag) {
    var notagEl = document.getElementById("tag-__notag__");
    if (notagEl) {
      notagEl.innerHTML = '<div class="tags-group"><h2 class="tags-group-header">无标签 <span class="tags-group-count">' + noTagPosts.length + '</span></h2>' + renderTagGroup(noTagPosts) + '</div>';
    }
  }

  // ---- Tag switching ----
  window.switchTag = function(tag) {
    var pills = document.querySelectorAll(".tags-pill");
    pills.forEach(function(p) { p.classList.remove("tags-pill-active"); });
    var activePill = document.querySelector('.tags-pill[data-tag="' + tag + '"]');
    if (activePill) activePill.classList.add("tags-pill-active");

    if (allEl) allEl.style.display = tag === "all" ? "block" : "none";
    tagNames.forEach(function(t) {
      var el = document.getElementById("tag-" + t.replace(/[^a-zA-Z0-9一-鿿]/g, '_'));
      if (el) el.style.display = tag === t ? "block" : "none";
    });
    if (notagEl) notagEl.style.display = tag === "__notag__" ? "block" : "none";
  };
})();
