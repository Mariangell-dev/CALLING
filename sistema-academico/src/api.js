// Unico lugar donde vive la direccion de la API (DRY aplicado al despliegue).
// En desarrollo sale de .env.development y en produccion de .env.production.
const BASE = import.meta.env.VITE_API_URL;

async function pedir(ruta, opciones) {
  const respuesta = await fetch(`${BASE}${ruta}`, opciones);
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    // La API responde { error: '...' } cuando algo sale mal; se muestra ese mensaje.
    throw new Error(datos.error || 'No se pudo conectar con la API');
  }
  return datos;
}

export function obtenerEstudiantes() {
  return pedir('/estudiantes');
}

export function obtenerResumen() {
  return pedir('/estudiantes/resumen');
}

export function crearEstudiante(nombre, nota) {
  return pedir('/estudiantes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, nota })
  });
}
