// ================================================================
// Theme System — Color themes, dark/light mode, theme panel
// Extracted from landing.js getDarkModeScript()
// ================================================================
(function() {
  'use strict';

  var T = {
    "default": {
      L: {"--bg-body":"#faf9f5","--bg-nav":"#faf9f5","--bg-card":"#ffffff","--bg-surface":"#f5f0e8","--bg-surface-hover":"#efe9de","--bg-code":"#f5f0e8","--text-primary":"#141413","--text-body":"#2d2d2a","--text-secondary":"#3d3d3a","--text-muted":"#6c6a64","--text-muted-soft":"#8e8b82","--text-muted-pale":"#a3a09a","--border-hairline":"#e6dfd8","--border-strong":"#141413","--accent":"#cc785c","--accent-hover":"#a9583e","--overlay":"rgba(0,0,0,0.35)","--heat-l0":"#ebedf0","--heat-l1":"#fce4d6","--heat-l2":"#f5b999","--heat-l3":"#e8906b","--heat-l4":"#cc785c"},
      D: {"--bg-body":"#1a1a1a","--bg-nav":"#1a1a1a","--bg-card":"#242424","--bg-surface":"#2a2a2a","--bg-surface-hover":"#333333","--bg-code":"#2a2a2a","--text-primary":"#e8e6e1","--text-body":"#c8c5be","--text-secondary":"#b8b5ae","--text-muted":"#9e9b94","--text-muted-soft":"#7a7870","--text-muted-pale":"#7a7870","--border-hairline":"#2d2d2d","--border-strong":"#3d3d3d","--accent":"#cc785c","--accent-hover":"#b5694d","--overlay":"rgba(0,0,0,0.5)","--heat-l0":"#2d2d2d","--heat-l1":"#5c3a28","--heat-l2":"#8a5030","--heat-l3":"#b56a3c","--heat-l4":"#cc785c"},
      name: "默认", swatches: ["#cc785c","#141413","#faf9f5"]
    },
    "clay": {
      L: {"--bg-body":"#fffaf0","--bg-nav":"#fffaf0","--bg-card":"#ffffff","--bg-surface":"#faf5e8","--bg-surface-hover":"#f5f0e0","--bg-code":"#f5f0e0","--text-primary":"#0a0a0a","--text-body":"#3a3a3a","--text-secondary":"#1a1a1a","--text-muted":"#6a6a6a","--text-muted-soft":"#9a9a9a","--text-muted-pale":"#b0b0b0","--border-hairline":"#e5e5e5","--border-strong":"#0a0a0a","--accent":"#ff4d8b","--accent-hover":"#e04078","--overlay":"rgba(0,0,0,0.35)","--heat-l0":"#f0ece5","--heat-l1":"#ffd6e4","--heat-l2":"#ff9ab8","--heat-l3":"#ff6b94","--heat-l4":"#ff4d8b"},
      D: {"--bg-body":"#0a1a1a","--bg-nav":"#0a1a1a","--bg-card":"#1a2a2a","--bg-surface":"#1a2a2a","--bg-surface-hover":"#2a3a3a","--bg-code":"#1a2a2a","--text-primary":"#ffffff","--text-body":"#c0c0c0","--text-secondary":"#e0e0e0","--text-muted":"#a0a0a0","--text-muted-soft":"#888888","--text-muted-pale":"#707070","--border-hairline":"#2a3a3a","--border-strong":"#3a4a4a","--accent":"#ff4d8b","--accent-hover":"#ff7099","--overlay":"rgba(0,0,0,0.5)","--heat-l0":"#1a2525","--heat-l1":"#3a2030","--heat-l2":"#6a3050","--heat-l3":"#9a4068","--heat-l4":"#ff4d8b"},
      name: "暖陶", swatches: ["#ff4d8b","#0a1a1a","#fffaf0"]
    },
    "cobalt": {
      L: {"--bg-body":"#ffffff","--bg-nav":"#ffffff","--bg-card":"#ffffff","--bg-surface":"#f7f7f7","--bg-surface-hover":"#eef0f3","--bg-code":"#f7f7f7","--text-primary":"#0a0b0d","--text-body":"#5b616e","--text-secondary":"#0a0b0d","--text-muted":"#7c828a","--text-muted-soft":"#a8acb3","--text-muted-pale":"#c0c4c8","--border-hairline":"#dee1e6","--border-strong":"#0a0b0d","--accent":"#0052ff","--accent-hover":"#003ecc","--overlay":"rgba(0,0,0,0.35)","--heat-l0":"#eef0f3","--heat-l1":"#cce0ff","--heat-l2":"#99bbff","--heat-l3":"#6688ff","--heat-l4":"#0052ff"},
      D: {"--bg-body":"#0a0b0d","--bg-nav":"#0a0b0d","--bg-card":"#16181c","--bg-surface":"#16181c","--bg-surface-hover":"#222428","--bg-code":"#16181c","--text-primary":"#ffffff","--text-body":"#c0c0c0","--text-secondary":"#e0e0e0","--text-muted":"#a8acb3","--text-muted-soft":"#909498","--text-muted-pale":"#787c80","--border-hairline":"#222428","--border-strong":"#303438","--accent":"#0052ff","--accent-hover":"#3375ff","--overlay":"rgba(0,0,0,0.5)","--heat-l0":"#181a1e","--heat-l1":"#1a2840","--heat-l2":"#203860","--heat-l3":"#284880","--heat-l4":"#0052ff"},
      name: "钴蓝白", swatches: ["#0052ff","#0a0b0d","#ffffff"]
    },
    "inkterm": {
      L: {"--bg-body":"#fdfcfc","--bg-nav":"#fdfcfc","--bg-card":"#fdfcfc","--bg-surface":"#f8f7f7","--bg-surface-hover":"#f1eeee","--bg-code":"#f1eeee","--text-primary":"#201d1d","--text-body":"#424245","--text-secondary":"#302c2c","--text-muted":"#646262","--text-muted-soft":"#6e6e73","--text-muted-pale":"#9a9898","--border-hairline":"rgba(15,0,0,0.12)","--border-strong":"#646262","--accent":"#007aff","--accent-hover":"#0056b3","--overlay":"rgba(0,0,0,0.35)","--heat-l0":"#f1eeee","--heat-l1":"#cce4ff","--heat-l2":"#99c4ff","--heat-l3":"#669fff","--heat-l4":"#007aff"},
      D: {"--bg-body":"#201d1d","--bg-nav":"#201d1d","--bg-card":"#302c2c","--bg-surface":"#302c2c","--bg-surface-hover":"#3a3636","--bg-code":"#302c2c","--text-primary":"#fdfcfc","--text-body":"#c0c0c0","--text-secondary":"#e0e0e0","--text-muted":"#9a9898","--text-muted-soft":"#888686","--text-muted-pale":"#767474","--border-hairline":"#3a3636","--border-strong":"#4a4646","--accent":"#007aff","--accent-hover":"#4d94ff","--overlay":"rgba(0,0,0,0.5)","--heat-l0":"#2a2828","--heat-l1":"#282838","--heat-l2":"#303858","--heat-l3":"#384878","--heat-l4":"#007aff"},
      name: "墨色终端", swatches: ["#007aff","#201d1d","#fdfcfc"]
    }
  };

  var CURRENT_THEME = "default";
  var tagAnimEnabled = true;
  var panelAnimEnabled = true;
  var panelOpen = false;

  // Init dark mode from saved pref
  (function() {
    var saved = localStorage.getItem("page2-theme");
    var theme = null, isDark = null;
    if (saved) {
      try { var cfg = JSON.parse(saved); theme = cfg.theme; isDark = cfg.dark; } catch(e) {}
    }
    var dark = (isDark === true) || (isDark === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark-mode");
    if (theme && T[theme]) { CURRENT_THEME = theme; applyTheme(); }
    tagAnimEnabled = (saved ? JSON.parse(saved).tagAnim !== false : true);
    if (!tagAnimEnabled) document.documentElement.setAttribute("data-tag-anim", "off");
    panelAnimEnabled = (saved ? JSON.parse(saved).panelAnim !== false : true);
    if (!panelAnimEnabled) document.documentElement.setAttribute("data-panel-anim", "off");
  })();

  function applyTheme() {
    var t = T[CURRENT_THEME];
    if (!t) return;
    var isDark = document.documentElement.classList.contains("dark-mode");
    var colors = isDark ? t.D : t.L;
    if (!colors) return;
    var r = document.documentElement;
    Object.keys(colors).forEach(function(k) {
      r.style.setProperty(k, colors[k]);
    });
    r.setAttribute("data-theme", CURRENT_THEME);
    r.style.setProperty("color-scheme", isDark ? "dark" : "light");
    document.querySelectorAll("img").forEach(function(img) {
      if (isDark) { img.style.setProperty("opacity", "0.75", "important"); }
      else { img.style.removeProperty("opacity"); }
    });
  }

  function saveThemeConfig() {
    try {
      localStorage.setItem("page2-theme", JSON.stringify({
        theme: CURRENT_THEME,
        dark: document.documentElement.classList.contains("dark-mode"),
        tagAnim: tagAnimEnabled,
        panelAnim: panelAnimEnabled
      }));
    } catch(e) {}
  }

  function toggleDark() {
    var html = document.documentElement;
    html.classList.add("transitioning");
    html.classList.toggle("dark-mode");
    applyTheme();
    saveThemeConfig();
    updatePanelUI();
    setTimeout(function() { html.classList.remove("transitioning"); }, 400);
  }

  function selectTheme(key) {
    if (key === CURRENT_THEME) return;
    CURRENT_THEME = key;
    applyTheme();
    saveThemeConfig();
    updatePanelUI();
  }

  function buildPanelHTML() {
    var h = "";
    h += '<div class="theme-panel-header">配色设置</div>';
    h += '<div class="theme-panel-section">';
    h += '<div class="theme-panel-label">显示模式</div>';
    h += '<div class="theme-mode-toggle">';
    h += '<button class="theme-mode-option" data-mode="light">浅色</button>';
    h += '<button class="theme-mode-option" data-mode="dark">深色</button>';
    h += '</div></div>';
    h += '<div class="theme-panel-section">';
    h += '<div class="theme-panel-label">配色主题</div>';
    h += '<div class="theme-scheme-grid">';
    Object.keys(T).forEach(function(k) {
      var t = T[k];
      h += '<button class="theme-scheme-card" data-theme="' + k + '">';
      h += '<span class="theme-scheme-swatches">';
      t.swatches.forEach(function(c) { h += '<span class="theme-scheme-swatch" style="background:' + c + '"></span>'; });
      h += '</span>';
      h += '<span class="theme-scheme-name">' + t.name + '</span>';
      h += '</button>';
    });
    h += '</div></div>';
    // Tag animation toggle
    h += '<div class="theme-panel-section">';
    h += '  <div class="theme-toggle-row">';
    h += '    <div class="theme-panel-label">标签动画</div>';
    h += '    <label class="theme-toggle-switch">';
    h += '      <input type="checkbox" id="tagAnimToggle">';
    h += '      <span class="tslider"></span>';
    h += '    </label>';
    h += '  </div>';
    h += '</div>';
    // Panel animation toggle
    h += '<div class="theme-panel-section">';
    h += '  <div class="theme-toggle-row">';
    h += '    <div class="theme-panel-label">面板动画</div>';
    h += '    <label class="theme-toggle-switch">';
    h += '      <input type="checkbox" id="panelAnimToggle">';
    h += '      <span class="tslider"></span>';
    h += '    </label>';
    h += '  </div>';
    h += '</div>';
    return h;
  }

  function injectPanel() {
    var backdrop = document.createElement("div");
    backdrop.className = "theme-panel-backdrop";
    backdrop.setAttribute("id", "themeBackdrop");
    backdrop.addEventListener("click", closePanel);
    document.body.appendChild(backdrop);
    var panel = document.createElement("div");
    panel.className = "theme-panel";
    panel.setAttribute("id", "themePanel");
    panel.innerHTML = buildPanelHTML();
    document.body.appendChild(panel);
    // Attach listeners
    panel.querySelectorAll(".theme-mode-option").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var mode = btn.dataset.mode;
        var isDark = document.documentElement.classList.contains("dark-mode");
        if ((mode === "dark" && !isDark) || (mode === "light" && isDark)) toggleDark();
      });
    });
    panel.querySelectorAll(".theme-scheme-card").forEach(function(card) {
      card.addEventListener("click", function() { selectTheme(card.dataset.theme); });
    });
    // Tag animation toggle
    var animToggle = panel.querySelector("#tagAnimToggle");
    if (animToggle) {
      animToggle.checked = tagAnimEnabled;
      animToggle.addEventListener("change", function() {
        tagAnimEnabled = animToggle.checked;
        if (tagAnimEnabled) { document.documentElement.removeAttribute("data-tag-anim"); }
        else { document.documentElement.setAttribute("data-tag-anim", "off"); }
        saveThemeConfig();
      });
    }
    // Panel animation toggle
    var panelAnimToggle = panel.querySelector("#panelAnimToggle");
    if (panelAnimToggle) {
      panelAnimToggle.checked = panelAnimEnabled;
      panelAnimToggle.addEventListener("change", function() {
        panelAnimEnabled = panelAnimToggle.checked;
        if (panelAnimEnabled) { document.documentElement.removeAttribute("data-panel-anim"); }
        else { document.documentElement.setAttribute("data-panel-anim", "off"); }
        saveThemeConfig();
      });
    }
  }

  function openPanel() {
    panelOpen = true;
    var panel = document.getElementById("themePanel");
    var backdrop = document.getElementById("themeBackdrop");
    panel.classList.remove("closing");
    backdrop.classList.remove("closing");
    panel.classList.add("show");
    backdrop.classList.add("show");
    document.body.style.overflow = "hidden";
    updatePanelUI();
  }

  function closePanel() {
    panelOpen = false;
    var panel = document.getElementById("themePanel");
    var backdrop = document.getElementById("themeBackdrop");
    panel.classList.add("closing");
    backdrop.classList.add("closing");
    setTimeout(function() {
      panel.classList.remove("show", "closing");
      backdrop.classList.remove("show", "closing");
      document.body.style.overflow = "";
    }, 250);
  }

  function updatePanelUI() {
    var panel = document.getElementById("themePanel");
    if (!panel) return;
    var isDark = document.documentElement.classList.contains("dark-mode");
    panel.querySelectorAll(".theme-mode-option").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.mode === (isDark ? "dark" : "light"));
    });
    panel.querySelectorAll(".theme-scheme-card").forEach(function(card) {
      card.classList.toggle("active", card.dataset.theme === CURRENT_THEME);
    });
    var animToggle = panel.querySelector("#tagAnimToggle");
    if (animToggle) animToggle.checked = tagAnimEnabled;
    var panelAnimToggle = panel.querySelector("#panelAnimToggle");
    if (panelAnimToggle) panelAnimToggle.checked = panelAnimEnabled;
  }

  // Public API
  window.__ThemeConfig = {
    getConfig: function() {
      return {
        theme: CURRENT_THEME,
        dark: document.documentElement.classList.contains("dark-mode"),
        name: T[CURRENT_THEME] ? T[CURRENT_THEME].name : ""
      };
    }
  };

  // Init on DOM ready
  function initThemePanel() {
    injectPanel();
    applyTheme();
    var btn = document.getElementById("themeToggleBtn");
    if (btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        panelOpen ? closePanel() : openPanel();
      });
    }
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && panelOpen) closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemePanel);
  } else {
    initThemePanel();
  }
})();
