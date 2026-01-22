// app.js — VERSAO EXERCICIO (preencher TODOs)
// Sem event handlers: corre tudo automaticamente ao abrir as páginas.

(function () {
  const page = document.body.dataset.page;

  // ---------- TODO (opcional): mudar regras/constantes ----------
  const TODAY_FALLBACK = "2026-01-16"; // usa esta data se não quiseres calcular a data real

  // ---------- Helpers ----------
  function $(selector) {
    return document.querySelector(selector);
  }

  function parseQuery() {
    // TODO: Ler query params e devolver um objeto
    // Ex: sessions.html?subject=programacao&status=planned
    // => { subject:"programacao", status:"planned" }
    return {};
  }

  function formatDate(dateStr) {
    // TODO: converter "YYYY-MM-DD" para formato legível pt-PT
    // Dica: new Date(dateStr) + Intl.DateTimeFormat
    return dateStr;
  }

  function formatTime(timeStr) {
    // TODO (opcional): validar/formatar HH:MM
    return timeStr;
  }

  function getSessionById(id) {
    // TODO: usar find no array window.SESSIONS
    return null;
  }

  // ---------- Filters + sorting ----------
  function applyFilters(sessions, filters) {
    // TODO: Implementar com filter
    // filters pode conter:
    // - subject (string)
    // - status ("planned" | "done")
    // - priority ("low" | "medium" | "high")
    // - minDuration (número)
    // - maxDuration (número)
    // - date ("YYYY-MM-DD")
    return sessions;
  }

  function priorityScore(priority) {
    // TODO: converter prioridade em número para ordenar
    // sugestão: high=3, medium=2, low=1
    return 0;
  }

  function sortSessions(sessions, sortKey) {
    // TODO: ordenar sem mutar o original
    // sortKey:
    // - dateAsc, dateDesc
    // - durationAsc, durationDesc
    // - priorityDesc (high primeiro)
    // Dica: slice().sort(...)
    return sessions;
  }

  // ---------- Stats ----------
  function countTodaySessions(sessions, todayStr) {
    // TODO: contar sessões cuja date == todayStr
    return 0;
  }

  function sumTodayMinutes(sessions, todayStr) {
    // TODO: somar durationMin de sessões do dia (filter + reduce)
    return 0;
  }

  function getNextPlannedSession(sessions, todayStr) {
    // TODO:
    // - filtrar status "planned"
    // - ordenar por date + startTime
    // - devolver a primeira
    return null;
  }

  function getCompletionRate(sessions) {
    // TODO:
    // percentagem de sessões done no total (0 a 100)
    // Dica: filter + length
    return 0;
  }

  // ---------- DOM render ----------
  function badgeHTML(text, variant) {
    const cls = variant ? `pill ${variant}` : "pill";
    return `<span class="${cls}">${text}</span>`;
  }

  function sessionItemHTML(s) {
    // TODO: criar HTML de um item da lista com:
    // - título
    // - meta: subject • date • time • duração
    // - badges: status + priority
    // Nota: usar formatDate/formatTime
    return `
      <div class="item">
        <div class="left">
          <p class="title">${s.title}</p>
          <p class="meta">${s.subject} • ${s.date} • ${s.startTime} • ${s.durationMin} min</p>
          <div class="badges">
            ${badgeHTML(s.status, s.status === "done" ? "ok" : "warn")}
            ${badgeHTML(s.priority, s.priority === "high" ? "danger" : "")}
          </div>
        </div>
        <div class="muted">${s.notes}</div>
      </div>
    `;
  }

  function renderSessionList(list, containerSelector) {
    // TODO:
    // - se lista vazia => não renderizar aqui (usa empty state)
    // - senão container.innerHTML = list.map(...).join("")
  }

  function renderEmptyState(show, containerSelector, message) {
    // TODO:
    // - mostrar/esconder o container (hidden)
    // - definir mensagem
  }

  function renderFiltersSummary(filters, containerSelector) {
    // TODO:
    // - transformar filters em texto "k: v • k: v"
    // - se nenhum => "Nenhum (lista completa)"
  }

  function renderResultsCount(filteredCount, totalCount, containerSelector) {
    // TODO: "A mostrar X de Y sessões"
  }

  function renderDashboardSummary(summary, containerSelector) {
    // TODO: render cards/linhas do resumo:
    // - sessões hoje
    // - minutos hoje
    // - próxima sessão (título + quando)
    // - taxa de conclusão
  }

  // ---------- Pages ----------
  function initDashboard() {
    // TODO:
    // - definir todayStr (podes usar TODAY_FALLBACK)
    // - preencher #todayStr
    // - calcular stats (countTodaySessions, sumTodayMinutes, getNextPlannedSession, getCompletionRate)
    // - renderDashboardSummary em #dashboardSummary
    // - renderizar próximas 5 sessões planeadas em #upcomingList
  }

  function initSessions() {
    // TODO:
    // - ler query params
    // - construir filters: subject/status/priority/minDuration/maxDuration/date
    // - aplicar filtros e ordenação (sortSessions)
    // - renderFiltersSummary + renderResultsCount
    // - renderSessionList
    // - se vazio => renderEmptyState(true, ...)
  }

  // ---------- Bootstrap ----------
  if (page === "dashboard") initDashboard();
  if (page === "sessions") initSessions();
})();
