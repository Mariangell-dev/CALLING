let estudiantes = [
  { id: 1, nombre: 'Ana', nota: 4.5 },
  { id: 2, nombre: 'Luis', nota: 2.8 }
];

function obtenerEstudiantes() {
  return estudiantes;
}

function agregarEstudiante(estudiante) {
  estudiantes.push(estudiante);
  return estudiante;
}

module.exports = {
  obtenerEstudiantes,
  agregarEstudiante
};