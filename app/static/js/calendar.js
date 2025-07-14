// ========================= CALENDARIO =========================
document.addEventListener('DOMContentLoaded', () => {
    const mainCalendar = new FullCalendar.Calendar(
        document.getElementById('calendar'),
        {
            initialView: 'timeGridWeek',
            locale: 'es',
            slotMinTime: '08:00:00',
            slotMaxTime: '20:00:00',
            selectable: true,

            // Al hacer clic en un slot libre, muestra el modal
            dateClick(info) {
                document.getElementById('citaForm').reset();
                openModal();
            },

            // Clic en evento creado (puedes expandir lógica aquí)
            eventClick(info) {
                openModal();
            }
        }
    );

    mainCalendar.render();
});

// ========================= MODAL =========================

// Función para mostrar el modal
function openModal() {
    document.getElementById('citaModal').classList.remove('hidden');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('citaModal').classList.add('hidden');
}

// Botón de cierre (X)
document.querySelector('#citaModal .close').addEventListener('click', 
closeModal);

