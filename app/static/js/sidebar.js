/* ============================================================================
   SIDEBAR  +  MINI–CALENDARIO COMPACTO
   ======================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Toggle del sidebar ---------- */
  const sidebar = document.getElementById('sidebar');
  document.getElementById('sidebarToggle').onclick = () =>
    sidebar.classList.toggle('collapsed');

  /* ---------- Mini-calendario (div#miniGrid) ---------- */
  const mc = new FullCalendar.Calendar(
    document.getElementById('miniGrid'),
    {
      initialView : 'dayGridMonth',
      locale      : 'es',
      firstDay    : 1,              // lunes
      headerToolbar: false,
      dayHeaders  : true,
      height      : 'auto',
      fixedWeekCount: false,

      /* clic en día ⇒ navega el calendario principal si existe            */
      dateClick(info) {
        if (window.mainCalendar) {
          window.mainCalendar.gotoDate(info.date);
        }
      },

      /* al cambiar de mes actualiza el título                             */
      datesSet: updateMcTitle,
    }
  );
  mc.render();

  /* Flechas «  <  >  »  (botones con data-step = –1 / +1) */
  document
    .querySelectorAll('.mc-header button')
    .forEach(btn =>
      (btn.onclick = () =>
        mc.incrementDate({ months: +btn.dataset.step }))
    );

  /* ---------- actualiza el título “Julio 2025” ---------- */
  function updateMcTitle(arg) {
    const d = arg.view.currentStart;
    document.getElementById('mcTitle').textContent =
      d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }
});

