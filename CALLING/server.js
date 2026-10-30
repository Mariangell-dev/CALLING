const http = require('http');

const NOTA_MINIMA = 3.0;
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];

const equipo = {
  equipo: 'Equipo 01',
  integrantes: ['Mariangell Cabrera', 'Oscar Henriquez']
};

function calcularPromedio(notas) {
  return notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
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
    return;
  }

  if (req.url === '/equipo') {
    responder(res, 200, equipo);
    return;
  }

  if (req.url === '/notas') {
    const promedio = calcularPromedio(notasDelCurso);

    responder(res, 200, {
      promedio,
      aprobado: estaAprobado(promedio)
    });
    return;
  }

  responder(res, 404, { error: 'Ruta no encontrada' });
});

servidor.listen(80);