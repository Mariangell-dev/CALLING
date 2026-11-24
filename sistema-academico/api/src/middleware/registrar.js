// Middleware: se escribe una vez y corre antes de TODAS las rutas (DRY en el back).
function registrar(req, res, siguiente) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  siguiente();
}

module.exports = registrar;
