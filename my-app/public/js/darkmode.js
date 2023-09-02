(function () {
  "use strict";

  var toggle = document.querySelector("#themeSwitch");
  var ls = window.localStorage;
  if (!toggle) return;

  toggle.addEventListener("click", function (e) {
    toggleTheme();
    // don't let this event get smothered
    e.stopPropagation();
  });

  function toggleTheme() {
    const theme = (getThemeMode() + 1) % 3;
    switch (theme) {
      case 0:
        // default (auto)
        ls.removeItem("darkmode");
        break;
      case 1:
        // light theme
        ls.darkmode = false;
        break;
      case 2:
        // dark theme
        ls.darkmode = true;
        break;
      default:
        break;
    }
    applyTheme();
  }

  function applyTheme() {
    if (!("darkmode" in ls)) {
      toggle.classList.replace("fill-white", "fill-slate-400");
      toggle.classList.replace("stroke-white", "stroke-slate-400");
    } else {
      toggle.classList.replace("fill-slate-400", "fill-white");
      toggle.classList.replace("stroke-slate-400", "stroke-white");
    }
    if (
      ls.darkmode === "true" ||
      (!("darkmode" in ls) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function getThemeMode() {
    if (!("darkmode" in ls)) return 0;
    if (!document.documentElement.classList.contains("dark")) {
      return 1;
    } else {
      return 2;
    }
  }

  applyTheme();
})();
