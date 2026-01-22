// app.js — VERSAO RESOLVIDA
// Sem event handlers: corre automaticamente ao abrir as páginas.

(function () {
  const page = document.body.dataset.page;

  // Data “fixa” para o projeto (podes trocar por data real se quiseres)
  const TODAY_FALLBACK = "2026-01-16";

  // ---------- Helpers ----------
  function $(selector) {
    return document.querySelector(selector);
  }

  function parseQuery() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj;
  }

  function formatDate(dateStr) {
    // Evita problemas de timezone com strings ISO: força hora
    const d = new Date(dateStr + "T00:00:00");
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(d);
  }

  function formatTime(timeStr) {
    // HH:MM -> HH:MM (mantém simples)
    if (!timeStr) return "";
    const [h, m] = String(timeStr).split(":");
    if (h === undefined || m === undefined) return String(timeStr);
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }

  function getSessionById(id) {
    return window.SESSIONS.find(s => s.id === id) || null;
  }

  // ---------- Filters + sorting ----------
  function applyFilters(sessions, filters) {
    const minD = filters.minDuration ? Number(filters.minDuration) : null;
    const maxD = filters.maxDuration ? Number(filters.maxDuration) : null;

    return sessions.filter(s => {
      if (filters.subject && s.subject !== filters.subject) return false;
      if (filters.status && s.status !== filters.status) return false;
      if (filters.priority && s.priority !== filters.priority) return false;
      if (filters.date && s.date !== filters.date) return false;

      if (minD !== null && !Number.isNaN(minD) && s.durationMin < minD) return false;
      if (maxD !== null && !Number.isNaN(maxD) && s.durationMin > maxD) return false;

      return true;
    });
  }

  function priorityScore(priority) {
    switch (priority) {
      case "high": return 3;
      case "medium": return 2;
      case "low": return 1;
      default: return 0;
    }
  }

  function dateTimeKey(s) {
    // Ordenação por date + startTime
    return `${s.date}T${formatTime(s.startTime)}:00`;
  }

  function sortSessions(sessions, sortKey) {
    const copy = sessions.slice();

    switch (sortKey) {
      case "dateAsc":
        return copy.sort((a, b) => dateTimeKey(a).localeCompare(dateTimeKey(b)));
      case "dateDesc":
        return copy.sort((a, b) => dateTimeKey(b).localeCompare(dateTimeKey(a)));
      case "durationAsc":
        return copy.sort((a, b) => a.durationMin - b.durationMin);
      case "durationDesc":
        return copy.sort((a, b) => b.durationMin - a.durationMin);
      case "priorityDesc":
        return copy.sort((a, b) => priorityScore(b.priority) - priorityScore(a.priority));
      default:
        return copy;
    }
  }

  // ---------- Stats ----------
  function countTodaySessions(sessions, todayStr) {
    return sessions.filter(s => s.date === todayStr).length;
  }

  function sumTodayMinutes(sessions, todayStr) {
    return sessions
      .filter(s => s.date === todayStr)
      .reduce((acc, s) => acc + s.durationMin, 0);
  }

  function getNextPlannedSession(sessions, todayStr) {
    // Próxima sessão: planned e >= hoje (inclui hoje)
    const planned = sessions
      .filter(s => s.status === "planned")
      .filter(s => s.date >= todayStr);

    const sorted = sortSessions(planned, "dateAsc");
    return sorted[0] || null;
  }

  function getCompletionRate(sessions) {
    if (!sessions.length) return 0;
    const done = sessions.filter(s => s.status === "done").length;
    return Math.round((done / sessions.length) * 100);
  }

  // ---------- DOM render ----------
  function badgeHTML(text, variant) {
    const cls = variant ? `pill ${variant}` : "pill";
    return `<span class="${cls}">${text}</span>`;
  }

  function sessionItemHTML(s) {
    const statusVariant = s.status === "done" ? "ok" : "warn";
    const priorityVariant = s.priority === "high" ? "danger" : "";

    return `
      <div class="item">
        <div class="left">
          <p class="title">${s.title}</p>
          <p class="meta">
            ${s.subject} • ${formatDate(s.date)} • ${formatTime(s.startTime)} • ${s.durationMin} min
          </p>
          <div class="badges">
            ${badgeHTML(s.status, statusVariant)}
            ${badgeHTML(s.priority, priorityVariant)}
          </div>
        </div>
        <div class="muted">${s.notes}</div>
      </div>
    `;
  }

  function renderSessionList(list, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    if (!list.length) {
      el.innerHTML = "";
      return;
    }

    el.innerHTML = list.map(sessionItemHTML).join("");
  }

  function renderEmptyState(show, containerSelector, message) {
    const el = $(containerSelector);
    if (!el) return;

    el.hidden = !show;
    el.textContent = message || "";
  }

  function renderFiltersSummary(filters, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    const entries = Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null && v !== "");

    if (!entries.length) {
      el.textContent = "Nenhum (lista completa)";
      return;
    }

    el.textContent = entries.map(([k, v]) => `${k}: ${v}`).join(" • ");
  }

  function renderResultsCount(filteredCount, totalCount, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;
    el.textContent = `A mostrar ${filteredCount} de ${totalCount} sessões`;
  }

  function renderDashboardSummary(summary, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    const nextText = summary.next
      ? `${summary.next.title} — ${formatDate(summary.next.date)} às ${formatTime(summary.next.startTime)}`
      : "Nenhuma sessão planeada";

    el.innerHTML = `
      <div class="row"><span class="muted">Sessões hoje</span><span><strong>${summary.todayCount}</strong></span></div>
      <div class="row"><span class="muted">Minutos hoje</span><span><strong>${summary.todayMinutes}</strong></span></div>
      <div class="row"><span class="muted">Próxima sessão</span><span style="text-align:right"><strong>${nextText}</strong></span></div>
      <div class="divider"></div>
      <div class="row total"><span>Conclusão</span><span>${summary.completionRate}%</span></div>
    `;
  }

  // ---------- Pages ----------
  function initDashboard() {
    const todayStr = TODAY_FALLBACK;

    const todayEl = $("#todayStr");
    if (todayEl) todayEl.textContent = formatDate(todayStr);

    const sessions = window.SESSIONS.slice();

    const todayCount = countTodaySessions(sessions, todayStr);
    const todayMinutes = sumTodayMinutes(sessions, todayStr);
    const next = getNextPlannedSession(sessions, todayStr);
    const completionRate = getCompletionRate(sessions);

    renderDashboardSummary(
      { todayCount, todayMinutes, next, completionRate },
      "#dashboardSummary"
    );

    // Próximas sessões: planned a partir de hoje, ordenadas e limitadas a 5
    const upcoming = sortSessions(
      sessions.filter(s => s.status === "planned" && s.date >= todayStr),
      "dateAsc"
    ).slice(0, 5);

    renderSessionList(upcoming, "#upcomingList");

    // Caso não haja próximas
    if (!upcoming.length) {
      const el = $("#upcomingList");
      if (el) el.innerHTML = `<div class="empty">Sem sessões planeadas.</div>`;
    }
  }

  function initSessions() {
    const q = parseQuery();

    const filters = {
      subject: q.subject || "",
      status: q.status || "",
      priority: q.priority || "",
      minDuration: q.minDuration || "",
      maxDuration: q.maxDuration || "",
      date: q.date || ""
    };

    const sortKey = q.sort || "";

    const total = window.SESSIONS.length;

    const filtered = applyFilters(window.SESSIONS, filters);
    const sorted = sortSessions(filtered, sortKey);

    renderFiltersSummary({ ...filters, sort: sortKey }, "#filtersSummary");
    renderResultsCount(sorted.length, total, "#resultsCount");

    renderSessionList(sorted, "#sessionsList");

    if (!sorted.length) {
      renderEmptyState(
        true,
        "#emptyState",
        "Sem resultados para os filtros aplicados. Experimenta remover filtros."
      );
    } else {
      renderEmptyState(false, "#emptyState", "");
    }
  }

  // ---------- Bootstrap ----------
  if (page === "dashboard") initDashboard();
  if (page === "sessions") initSessions();
})();
