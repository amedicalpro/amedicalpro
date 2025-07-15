document.addEventListener('DOMContentLoaded', () => {

  /* ───────── Calendario principal ───────── */
  const mainCalendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'timeGridWeek',
      locale: 'es',
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      selectable: true,

      // clic sobre un hueco libre
      dateClick(info) {
        console.log('dateClick', info.dateStr);
        document.getElementById('citaForm').reset();
        openModal();
      },

      // clic sobre un evento ya creado
      eventClick(info) {
        console.log('eventClick', info.event.id);
        openModal();
      }
    }
  );
  mainCalendar.render();

  /* ───────── Botón flotante (+) ───────── */
  document.getElementById('fab').onclick = () => {
    document.getElementById('citaForm').reset();
    openModal();
  };

  /* ───────── Modal ───────── */
  const modal     = document.getElementById('citaModal');
  const btnClose  = document.getElementById('modalClose');

  function openModal() {
    modal.classList.remove('hidden');
  }
  function closeModal() {
    modal.classList.add('hidden');
  }
  btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();   // clic fuera de la tarjeta
  });

  /* ───────── Calcula edad ───────── */
  window.calcularEdad = function (fechaStr) {
    if (!fechaStr) return;
    const h   = new Date();
    const nac = new Date(fechaStr);
    let edad  = h.getFullYear() - nac.getFullYear();
    const m   = h.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && h.getDate() < nac.getDate())) edad--;
    document.getElementById('edadCampo').value = edad;
  };

});

