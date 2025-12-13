enum Genero {
  Accion = "Acción",
  Comedia = "Comedia",
  Drama = "Drama",
  Fantasia = "Fantasía",
  CienciaFiccion = "Ciencia Ficción"
}

enum Pais {
  Venezuela = "Venezuela",
  EstadosUnidos = "Estados Unidos",
  España = "España",
  Japon = "Japón",
  Francia = "Francia",
  GranBretaña = "Gran Bretaña"
}

interface Pelicula {
  id?: number;
  titulo: string;
  genero: Genero;
  pais: Pais;
}


// Función para renderizar películas en la tabla
function renderPeliculas(peliculas: Pelicula[]) {
  const tbody = document.querySelector("#peliculas tbody") as HTMLTableSectionElement;
  tbody.innerHTML = "";
  peliculas.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.titulo}</td>
      <td>${p.pais}</td>
      <td>${p.genero}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Cargar películas desde el backend
async function cargarPeliculas() {
  const response = await fetch("/peliculas");
  const peliculas: Pelicula[] = await response.json();
  renderPeliculas(peliculas);
}

// Guardar nueva película
document.addEventListener("DOMContentLoaded", () => {
  cargarPeliculas();

  const form = document.getElementById("formPelicula") as HTMLFormElement;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
    const genero = (document.getElementById("genero") as HTMLSelectElement).value as Genero;
    const pais = (document.getElementById("pais") as HTMLSelectElement).value as Pais;

    await fetch("/peliculas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, genero, pais })
    });

    form.reset();
    cargarPeliculas();
  });
});