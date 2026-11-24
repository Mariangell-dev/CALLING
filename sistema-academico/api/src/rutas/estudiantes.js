const express = require('express');
const router = express.Router();

const {
  obtenerEstudiantes,
  agregarEstudiante
} = require('../datos/repositorio');

const {
  estaAprobado,
  calcularPromedio,
  validarNota
} = require('../logica/reglas-notas');

// Listar estudiantes
router.get('/', (req, res) => {
  const estudiantes = obtenerEstudiantes();

  const resultado = estudiantes.map(e => ({
    ...e,
    estado: estaAprobado(e.nota) ? 'Aprobado' : 'Reprobado'
  }));

  res.json(resultado);
});

// Resumen de notas
router.get('/resumen', (req, res) => {
  const estudiantes = obtenerEstudiantes();
  const notas = estudiantes.map(e => e.nota);

  res.json({
    promedio: calcularPromedio(notas),
    aprobados: estudiantes.filter(e => estaAprobado(e.nota)).length,
    total: estudiantes.length
  });
});

// Agregar estudiante
router.post('/', (req, res) => {
  const { nombre, nota } = req.body;

  // Validacion en el servidor: cualquiera puede llamar la API sin pasar por el front.
  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'Falta el nombre del estudiante' });
  }
  if (!validarNota(nota)) {
    return res.status(400).json({ error: 'La nota debe ser un número entre 0 y 5' });
  }
  const nuevo = {
    id: Date.now(),
    nombre: nombre.trim(),
    nota
  };

  agregarEstudiante(nuevo);
  res.status(201).json(nuevo);
});

module.exports = router;