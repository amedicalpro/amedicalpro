document.addEventListener('DOMContentLoaded', () => {
  // Toggle sidebar
  const sidebar = document.getElementById('sidebar');
  document.getElementById('sidebarToggle').onclick = () => {
    sidebar.classList.toggle('collapsed');
  };

  /* Mini-calendar (simple) */
  const mini = new FullCalendar.Calendar(document.getElementById('miniCalendar'), {
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: { left: 'prev', center: 'title', right: 'next' },
    dateClick(info) {
      mainCalendar.gotoDate(info.date);
    }
  });
  mini.render();

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

