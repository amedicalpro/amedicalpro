document.addEventListener('DOMContentLoaded', () => {
  // Toggle sidebar
  const sidebar = document.getElementById('sidebar');
  document.getElementById('sidebarToggle').onclick = () => {
    sidebar.classList.toggle('collapsed');
  };

/* ==== MINI-CALENDARIO COMPACTO ==== */
const mc = new FullCalendar.Calendar(document.getElementById('miniGrid'), {
  initialView: 'dayGridMonth',
  locale: 'es',
  firstDay: 1,          // lunes
  headerToolbar: false,
  dayHeaders: true,
  height: 'auto',
  fixedWeekCount: false,
  dateClick(info) {           // clic día → va a la agenda
    mainCalendar.gotoDate(info.date);
  },
  datesSet: updateMcTitle     // refresca título "Julio 2025"
});
mc.render();

function updateMcTitle(arg){
  const d = arg.view.currentStart;
  document.getElementById('mcTitle')
    .textContent = d.toLocaleDateString('es-ES',
      { month: 'long', year: 'numeric' });
}

/* Flechas ≪ ‹ › ≫ */
document.querySelectorAll('.mc-header button').forEach(btn=>{
  btn.onclick = () => mc.incrementDate({ months: +btn.dataset.step });
});

  /* Agenda principal */
  const mainCalendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'timeGridWeek',
    slotMinTime: '08:00',
    slotMaxTime: '20:00',
    height: '100%',
    dateClick(info) {
      openModal(info.dateStr, info.dateStr); // simplificado
    }
  });
  mainCalendar.render();

  /* FAB abre modal */
  document.getElementById('fab').onclick = () => openModal();

  /* Modal */
  const modal = document.getElementById('modal');
  document.getElementById('modalClose').onclick = () => modal.classList.add('hidden');
  modal.querySelector('.save').onclick = e => {
    e.preventDefault();
    modal.classList.add('hidden');
    // Aquí guardarías vía fetch/AJAX…
  };

  function openModal(start, end){
    modal.classList.remove('hidden');
    // rellenar campos si es necesario…
  }
});

