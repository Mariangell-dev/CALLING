const NOTA_MINIMA = 3.0;
const NOTA_MINIMA_PERMITIDA = 0;
const NOTA_MAXIMA = 5;

function estaAprobado(nota) {
  return nota >= NOTA_MINIMA;
}

function calcularPromedio(notas) {
  if (notas.length === 0) return 0;

  return notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
}

function validarNota(nota) {
  return typeof nota === 'number' &&
    Number.isFinite(nota) &&
    nota >= NOTA_MINIMA_PERMITIDA &&
    nota <= NOTA_MAXIMA;
}

module.exports = {
  estaAprobado,
  calcularPromedio,
  validarNota
};