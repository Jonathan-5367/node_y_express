// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const modal = document.getElementById('modal');
  const cerrarModalBtn = document.getElementById('cerrarModalBtn');
  const modalText = modal.querySelector('p');

  // Capturar envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // evitar recarga

    const formData = new FormData(form);
    const response = await fetch('/animal', {
      method: 'POST',
      body: new URLSearchParams(formData)
    });

    const data = await response.json();
    // mostrar el animal en el modal
    modalText.textContent = data.animal; 

    // Abrir modal
   abrirModalBtn.addEventListener("click", function() {
    modal.style.display = "flex";
})
  });

  // ocultar el modal al hacer clic fuera del contenido
  modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none'; 
  }
});

  // Cerrar modal
  cerrarModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});



