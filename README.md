# Sistema académico

Aplicación web para registrar estudiantes y sus notas: muestra la lista con el estado (Aprobado/Reprobado), el promedio del grupo y cuántos aprobaron. Está pensada para docentes que necesitan ver de un vistazo cómo va su curso.

Proyecto final de Buenas Prácticas de Desarrollo de Software (CUC) — Equipo 3 CALLING.

## Integrantes

| Nombre completo | De qué se encargó |
|---|---|
| Oscar Henriquez | Base del front en React con Vite y componente `Boton`, integración en GitHub, variables de entorno, CORS restringido, validaciones y middleware del back, despliegue en AWS (S3, EC2 y Security Group). |
| Mariangell Contreras | Back-end en Node/Express (rutas, lógica de notas y repositorio), pruebas con Vitest, componentes `FilaEstudiante` y `TarjetaEstadistica`, README. |

## Tecnologías

- **Front-end:** React 19 + Vite
- **Back-end:** Node.js + Express 5 (con `cors`)
- **Pruebas:** Vitest
- **Infraestructura:** AWS S3 (sitio estático) y AWS EC2 (API)

## Cómo levantarlo en local

Requisitos: Node.js 20 o superior y Git.

```bash
git clone https://github.com/Mariangell-dev/CALLING.git
```

**Terminal 1 — la API** (queda en http://localhost:3000):

```bash
cd CALLING/sistema-academico/api
npm install
npm run dev
```

**Terminal 2 — el front** (queda en http://localhost:5173):

```bash
cd CALLING/sistema-academico
npm install
npm run dev
```

**Variables de entorno.** Los nombres están en `sistema-academico/.env.example`:

| Variable | Dónde se usa | Valor |
|---|---|---|
| `VITE_API_URL` | Front | En local ya viene en `.env.development` (`http://localhost:3000`). Para producción se crea `.env.production` con la IP pública de la instancia EC2. |
| `PORT` | API | Opcional. Por defecto 3000; en la EC2 se usa 80. |

Los archivos `.env`, `.env.local` y `.env.production` están en el `.gitignore` y nunca se suben.

## Endpoints de la API

| Método | Ruta | Qué hace | Respuesta |
|---|---|---|---|
| GET | `/estudiantes` | Lista todos los estudiantes con su estado (Aprobado/Reprobado) calculado en el servidor | 200 · arreglo |
| GET | `/estudiantes/resumen` | Promedio del grupo, cuántos aprobaron y total | 200 · objeto |
| POST | `/estudiantes` | Agrega un estudiante. Requiere `nombre` (texto) y `nota` (número entre 0 y 5) | 201 · el creado<br>400 · `{ "error": "..." }` con lo que está mal |

Ejemplo de POST:

```json
{ "nombre": "María", "nota": 4.8 }
```

La nota mínima aprobatoria (3.0) vive solo en `api/src/logica/reglas-notas.js`. El front no la conoce: recibe el estado ya calculado. Si cambia la regla, se cambia en ese único archivo.

## Cómo correr las pruebas

Desde la carpeta `sistema-academico`:

```bash
npm test
```

Corre 8 pruebas sobre las reglas del negocio (`api/src/logica/reglas-notas.test.js`): aprobado/reprobado, la nota exacta de 3.0, el promedio, la lista vacía y la validación de notas fuera de rango.

## Despliegue

- **Front:** http://cuc-bp-eq03-calling-2026.s3-website-us-east-1.amazonaws.com (bucket S3 con alojamiento web estático).
- **API:** instancia EC2 Amazon Linux 2023 en el puerto 80. Para cuidar el presupuesto del Learner Lab, la instancia se terminó después de tomar las evidencias; la IP usada aparece en el documento de entrega.

**Pasos para volver a desplegar:**

1. Crear un Security Group con una sola regla de entrada: HTTP (80) desde 0.0.0.0/0. Sin SSH.
2. Lanzar una instancia EC2 (Amazon Linux 2023) con ese Security Group y pegar en *User data* el script `sistema-academico/api/despliegue/user-data.sh`. El script instala Node, descarga el código de la rama `dev` y deja la API corriendo como servicio.
3. Probar `http://IP-PUBLICA/estudiantes` en el navegador: debe responder JSON.
4. En `sistema-academico`, crear `.env.production` con `VITE_API_URL=http://IP-PUBLICA` y ejecutar `npm run build`.
5. Subir el **contenido** de `dist/` al bucket (el `index.html` queda en la raíz).
6. Al terminar: terminar la instancia y liberar la Elastic IP si se reservó una.

### Seguridad

- **Validación en el servidor:** el POST rechaza con 400 y un mensaje claro un nombre vacío o una nota que no sea un número entre 0 y 5.
- **CORS restringido:** la API solo acepta peticiones del sitio en S3 (y de `localhost:5173` para desarrollo). Ver `api/src/servidor.js`.
- **Secretos fuera de Git:** `.env*` en el `.gitignore` y un `.env.example` con valores de ejemplo.
- **Security Group mínimo:** solo el puerto 80, SSH cerrado.
- **Dependencias:** `npm audit` ejecutado el 23/11/2026 en el front (`sistema-academico`) y en la API (`sistema-academico/api`): **0 vulnerabilidades** en ambos.

---

*Otros contenidos de este repositorio:* la carpeta `CALLING/` y los archivos de Unity (`Assets/`, `Packages/`, `ProjectSettings/`) son el videojuego 2D de terror trabajado en los cortes anteriores.
