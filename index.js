// Importar Express al proyecto para habilitar el servidor local
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

// Middleware para servir archivos estáticos y parsear cuerpos de solicitudes
app.use(express.static(path.join(__dirname)))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Servir index.html correctamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Endpoint simple para /animal (usado por ejercicio_1)
app.post('/animal', (req, res) => {
  const animal = req.body && req.body.animal ? req.body.animal : ''
  res.json({ animal })
})

// Persistencia ligera: archivo JSON en /db/peliculas.json
const peliculasFile = path.join(__dirname, 'db', 'peliculas.json')

// Cargar películas desde el archivo JSON
function loadPeliculas() {
  try {
    if (fs.existsSync(peliculasFile)) {
      const raw = fs.readFileSync(peliculasFile, 'utf8')
      const data = JSON.parse(raw)
      if (Array.isArray(data)) return data
    }
  } catch (err) {
    console.error('Error leyendo peliculas.json:', err)
  }
  // valor por defecto si no existe o falla la lectura
  return [
    { id: 1, titulo: 'Origen', genero: 'Ciencia Ficción', pais: 'Estados Unidos' },
    { id: 2, titulo: 'Amélie', genero: 'Comedia', pais: 'Francia' }
  ]
}

// Guardar películas en el archivo JSON
function savePeliculas(list) {
  try {
    const dir = path.dirname(peliculasFile)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(peliculasFile, JSON.stringify(list, null, 2), 'utf8')
  } catch (err) {
    console.error('Error guardando peliculas.json:', err)
  }
}

// Cargar películas al iniciar el servidor
let peliculas = loadPeliculas()

// Listar películas
app.get('/peliculas', (req, res) => {
  res.json(peliculas)
})

// Guardar película
app.post('/peliculas', (req, res) => {
  const { titulo, genero, pais } = req.body
  const id = peliculas.length ? peliculas[peliculas.length - 1].id + 1 : 1
  const nueva = { id, titulo, genero, pais }
  peliculas.push(nueva)
  // Guardar en archivo para persistencia
  savePeliculas(peliculas)
  res.json(nueva)
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`)
})
