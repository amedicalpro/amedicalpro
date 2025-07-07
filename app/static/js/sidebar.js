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
/* ====== MENÚ CONTEXTUAL SOBRE CITA ====== */
const calEl = document.getElementById('calendar');   // id del div principal

calEl.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  const eventEl = e.target.closest('.fc-event');
  if (!eventEl) return;                       // clic derecho en zona vacía -> ignora

  const evt = mainCalendar.getEventById(eventEl.getAttribute('data-event-id'));

  // Construir menú
  const menu = document.createElement('ul');
  menu.className = 'ctx-menu';
  menu.innerHTML = `
    <li data-act="confirmar">Confirmar</li>
    <li data-act="no-llega">No asiste</li>
    <li data-act="borrar">Eliminar</li>`;
  document.body.append(menu);

  // Posicionarlo donde hiciste clic
  menu.style.left = e.pageX + 'px';
  menu.style.top  = e.pageY + 'px';

  // Gestionar clics del menú
  menu.onclick = (ev) => {
    const act = ev.target.dataset.act;
    if (act === 'confirmar')  evt.setProp('backgroundColor', '#22c55e'); // verde
    if (act === 'no-llega')   evt.setProp('backgroundColor', '#9ca3af'); // gris
    if (act === 'borrar')     evt.remove();

    menu.remove();            // cerrar menú
  };

  // Cerrar si haces clic fuera
  document.addEventListener('click', () => menu.remove(), { once: true });
});


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

