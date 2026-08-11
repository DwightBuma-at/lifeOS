(function () {
  const TODO_KEY = "lifeOS_daily_todo_v1";

  function readTodoState() {
    try {
      const state = JSON.parse(localStorage.getItem(TODO_KEY));
      return state && typeof state === "object" ? state : {};
    } catch {
      return {};
    }
  }

  function setupSidebarBadgeStyles() {
    if (document.getElementById("lifeOSSidebarBadgeStyles")) return;

    const style = document.createElement("style");
    style.id = "lifeOSSidebarBadgeStyles";
    style.textContent = `
      .nav-badge {
        display: inline-grid;
        min-width: 23px;
        height: 23px;
        margin-left: auto;
        place-items: center;
        border-radius: 7px;
        background: #ef4444;
        color: #ffffff;
        padding: 0 6px;
        font-size: 11px !important;
        font-weight: 650;
        letter-spacing: -0.02em;
        line-height: 1;
        box-shadow: 0 6px 14px rgba(239, 68, 68, 0.22);
      }
      .nav-badge.hidden {
        display: none;
      }
      body.sidebar-collapsed .nav-badge {
        position: absolute;
        top: 5px;
        right: 5px;
        min-width: 16px;
        height: 16px;
        border-radius: 999px;
        padding: 0 4px;
        font-size: 9px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function formatBadgeCount(count) {
    if (count > 99) return "99+";
    return String(count);
  }

  function ensureBadge(link, badgeName) {
    let badge = link.querySelector(`[data-sidebar-badge="${badgeName}"]`);
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "nav-badge";
      badge.dataset.sidebarBadge = badgeName;
      link.appendChild(badge);
    }
    return badge;
  }

  function setBadge(link, badgeName, count) {
    if (!link) return;
    const badge = ensureBadge(link, badgeName);
    badge.textContent = formatBadgeCount(count);
    badge.classList.toggle("hidden", count <= 0);
    badge.setAttribute("aria-label", `${count} unchecked item${count === 1 ? "" : "s"}`);
  }

  function normalizeCompletions(value) {
    if (!value || typeof value !== "object") return {};
    const entries = Object.entries(value);
    const hasDateBuckets = entries.some(([key, item]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && item && typeof item === "object");
    if (!hasDateBuckets) return Object.fromEntries(entries.filter(([, item]) => typeof item === "boolean"));

    return entries.reduce((merged, [, bucket]) => {
      if (!bucket || typeof bucket !== "object") return merged;
      Object.entries(bucket).forEach(([routineId, isDone]) => {
        if (isDone) merged[routineId] = true;
      });
      return merged;
    }, {});
  }

  function updateLifeOSSidebarBadges() {
    const state = readTodoState();
    const routines = Array.isArray(state.routines) ? state.routines : [];
    const completions = normalizeCompletions(state.completions);
    const uncheckedRoutines = routines.filter((routine) => !completions[routine.id]).length;

    document.querySelectorAll('.sidebar a[href="to-do-list.html"]').forEach((link) => {
      setBadge(link, "todo", uncheckedRoutines);
    });
  }

  function setupSidebarSearch() {
    document.querySelectorAll("[data-sidebar-search]").forEach((input) => {
      const sidebar = input.closest(".sidebar");
      const items = Array.from(sidebar.querySelectorAll(".nav-item"));

      input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();

        items.forEach((item) => {
          const text = item.textContent.trim().toLowerCase();
          item.classList.toggle("hidden", query.length > 0 && !text.includes(query));
        });
      });

      input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        const firstVisible = items.find((item) => !item.classList.contains("hidden"));
        if (firstVisible) {
          window.location.href = firstVisible.getAttribute("href");
        }
      });
    });
  }

  function setupSidebarCollapse() {
    document.querySelectorAll("[data-sidebar-collapse]").forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-collapsed");
        const isCollapsed = document.body.classList.contains("sidebar-collapsed");
        button.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
        button.innerHTML = isCollapsed
          ? '<i data-lucide="chevron-right" class="h-5 w-5"></i>'
          : '<i data-lucide="chevron-left" class="h-5 w-5"></i>';

        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    });
  }

  function initializeSidebar() {
    setupSidebarBadgeStyles();
    setupSidebarSearch();
    setupSidebarCollapse();
    updateLifeOSSidebarBadges();
    window.updateLifeOSSidebarBadges = updateLifeOSSidebarBadges;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSidebar);
  } else {
    initializeSidebar();
  }
})();
