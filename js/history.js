// ================================================================
// Browsing History Drawer
// Extracted from landing.js getHistoryDrawerScript()
// ================================================================
(function() {
  'use strict';

  var STORAGE_KEY = "blog_history";
  var MAX_ITEMS = 50;
  var drawer, overlay, trigger, body, clearBtn, closeBtn;
  var isOpen = false;
  var isDragging = false;
  var dragStartY = 0;
  var dragStartTop = 0;
  var savedTop = null;

  function getHistory() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) { return []; }
  }

  function saveHistory(arr) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, MAX_ITEMS)));
    } catch(e) {}
  }

  function getPageInfo() {
    var title = document.title.split(" | ")[0].trim();
    var url = window.location.pathname + window.location.search + window.location.hash;
    var excerpt = "";
    var metaDesc = document.querySelector("meta[name=\"description\"]");
    if (metaDesc) excerpt = metaDesc.getAttribute("content") || "";
    if (!excerpt) {
      var firstP = document.querySelector(".article-body p, .page-body p, .blog-card-title");
      if (firstP) excerpt = firstP.textContent.trim().substring(0, 120);
    }
    return { id: url, title: title, url: url, excerpt: excerpt.substring(0, 150), time: new Date().toISOString() };
  }

  function recordVisit() {
    var path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/" || path === "/index.html") return;
    var info = getPageInfo();
    if (!info.title) return;
    var history = getHistory();
    history = history.filter(function(item) { return item.id !== info.id; });
    history.unshift(info);
    saveHistory(history);
  }

  function formatTime(iso) {
    var d = new Date(iso);
    var now = new Date();
    var diff = now - d;
    var min = Math.floor(diff / 60000);
    if (min < 1) return "刚刚";
    if (min < 60) return min + " 分钟前";
    var hours = Math.floor(min / 60);
    if (hours < 24) return hours + " 小时前";
    var days = Math.floor(hours / 24);
    if (days < 7) return days + " 天前";
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  }

  function renderHistory() {
    if (!body) return;
    var history = getHistory();
    if (history.length === 0) {
      body.innerHTML = '<div class="history-empty"><div class="history-empty-icon">&#128218;</div><div class="history-empty-title">暂无浏览历史</div><div class="history-empty-desc">浏览博客文章后，您的阅读记录会出现在这里</div><div class="history-empty-guide">&#8592; 点击左侧按钮开始阅读</div></div>';
      return;
    }
    var html = "";
    history.forEach(function(item, index) {
      html += '<a class="history-item" href="' + item.url + '" data-index="' + index + '">';
      html += '  <div class="history-item-info">';
      html += '    <div class="history-item-title">' + item.title + '</div>';
      html += '    <div class="history-item-time">' + formatTime(item.time) + '</div>';
      html += '  </div>';
      html += '  <button class="history-item-delete" data-index="' + index + '" onclick="event.preventDefault();event.stopPropagation();deleteHistoryItem(' + index + ')" aria-label="删除">';
      html += '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      html += '  </button>';
      html += '</a>';
    });
    body.innerHTML = html;
  }

  function openDrawer() {
    isOpen = true;
    renderHistory();
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  window.closeHistoryDrawer = function() {
    isOpen = false;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  window.deleteHistoryItem = function(index) {
    var history = getHistory();
    history.splice(index, 1);
    saveHistory(history);
    renderHistory();
  };

  window.clearAllHistory = function() {
    if (confirm("确定要清空所有浏览历史吗？")) {
      saveHistory([]);
      renderHistory();
    }
  };

  function initDrag() {
    if (!trigger) return;
    try {
      savedTop = localStorage.getItem("history_trigger_top");
      if (savedTop !== null) {
        trigger.style.top = savedTop + "px";
        trigger.style.transform = "none";
      }
    } catch(e) {}

    trigger.addEventListener("pointerdown", function(e) {
      var rect = trigger.getBoundingClientRect();
      if (e.pointerType === "touch" && Math.abs(e.clientX - rect.right) > 50) return;
      isDragging = true;
      trigger.classList.add("dragging");
      dragStartY = e.clientY;
      dragStartTop = trigger.getBoundingClientRect().top;
      trigger.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    trigger.addEventListener("pointermove", function(e) {
      if (!isDragging) return;
      var deltaY = e.clientY - dragStartY;
      var newTop = dragStartTop + deltaY;
      var maxTop = window.innerHeight - trigger.offsetHeight - 10;
      newTop = Math.max(10, Math.min(newTop, maxTop));
      trigger.style.top = newTop + "px";
      trigger.style.transform = "none";
    });

    trigger.addEventListener("pointerup", function(e) {
      if (!isDragging) return;
      isDragging = false;
      trigger.classList.remove("dragging");
      trigger.releasePointerCapture(e.pointerId);
      var moved = Math.abs(e.clientY - dragStartY);
      if (moved < 5) {
        if (isOpen) { closeHistoryDrawer(); }
        else { openDrawer(); }
      } else {
        try { localStorage.setItem("history_trigger_top", trigger.style.top.replace("px", "")); } catch(e) {}
      }
    });

    trigger.addEventListener("pointercancel", function() {
      isDragging = false;
      trigger.classList.remove("dragging");
    });
  }

  function init() {
    drawer = document.getElementById("historyDrawer");
    overlay = document.getElementById("historyOverlay");
    trigger = document.getElementById("historyTrigger");
    body = document.getElementById("historyBody");
    clearBtn = document.getElementById("historyClearBtn");
    closeBtn = document.getElementById("historyCloseBtn");

    if (!drawer || !trigger) return;

    if (closeBtn) closeBtn.addEventListener("click", closeHistoryDrawer);
    if (overlay) overlay.addEventListener("click", closeHistoryDrawer);
    if (clearBtn) clearBtn.addEventListener("click", clearAllHistory);
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && isOpen) closeHistoryDrawer();
    });

    initDrag();
    recordVisit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
