/* ----------------------------- CALENDARIO 
----------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const mainCalendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'timeGridWeek',
      locale: 'es',
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      selectable: true,

      /* ——— Al hacer clic en un slot abre el modal ——— */
      dateClick(info) {
        // Limpia el formulario y abre la ventana
        document.getElementById('citaForm').reset();
        openModal();
      },

      /* —— Ejemplo de click en evento (cita ya creada) —— */
      eventClick(info) {
        // TODO: rellenar el formulario con los datos de la cita
        openModal();
      },
    }
  );

  mainCalendar.render();
});

/* ----------------------------- MODAL ----------------------------- 
*/
function openModal() {
  document.getElementById('citaModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('citaModal').classList.add('hidden');
}

/* Botón de cierre ( × ) */
document.querySelector('#citaModal .close').addEventListener('click', 
closeModal);

