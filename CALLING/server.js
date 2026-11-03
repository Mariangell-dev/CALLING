const http = require('http');

const d = [4.5, 3.5, 2.5, 4.0];

function calcularPromedio(d) {
  let t = 0;
  for (let i = 0; i < d.length; i++) {
    t += d[i];
  }
  return t / d.length;
}

function responder(res, codigo, datos) {
  res.writeHead(codigo, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(datos, null, 2));
}

const s = http.createServer((req, res) => {
  if (req.url === '/salud') {
    responder(res, 200, { estado: 'ok' });
  } else if (req.url === '/equipo') {
    responder(res, 200, {
      equipo: 'Equipo 01',
      integrantes: ['Mariangell Cabrera', 'Oscar Henriquez']
    });
  } else if (req.url === '/notas') {
    const p = calcularPromedio(d);
    responder(res, 200, {
      promedio: p,
      aprobado: p >= 3.0
    });
  } else {
    responder(res, 404, { error: 'Ruta no encontrada' });
  }
});

s.listen(80);