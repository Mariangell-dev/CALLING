const http = require('http');

const PUERTO = 80;
const NOTA_MINIMA = 3.0;
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];

function calcularPromedio(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
}

function estaAprobado(promedio) {
  return promedio >= NOTA_MINIMA;
}

function responder(res, codigo, datos) {
  res.writeHead(codigo, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(datos, null, 2));
}

const servidor = http.createServer((req, res) => {
  if (req.url === '/salud') {
    responder(res, 200, { estado: 'ok' });
  } else if (req.url === '/equipo') {
    responder(res, 200, {
      equipo: 'Equipo 01',
      integrantes: ['Mariangell Cabrera', 'Oscar Henriquez']
    });
  } else if (req.url === '/notas') {
    const promedio = calcularPromedio(notasDelCurso);
    responder(res, 200, {
      promedio: promedio,
      aprobado: estaAprobado(promedio)
    });
  } else {
    responder(res, 404, { error: 'Ruta no encontrada' });
  }
});

servidor.listen(PUERTO);
