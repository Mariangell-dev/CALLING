const express = require('express');
const cors = require('cors');
const estudiantes = require('./rutas/estudiantes');
const registrar = require('./middleware/registrar');

// CORS restringido: solo el front publicado en S3 (y el de desarrollo local)
// pueden consumir esta API. Si cambia el bucket, se cambia aqui y en ninguna otra parte.
const ORIGEN_FRONT_S3 = 'http://cuc-bp-eq03-calling-2026.s3-website-us-east-1.amazonaws.com';
const ORIGEN_FRONT_LOCAL = 'http://localhost:5173';

const app = express();

app.use(cors({ origin: [ORIGEN_FRONT_S3, ORIGEN_FRONT_LOCAL] }));
app.use(express.json());
app.use(registrar);

app.use('/estudiantes', estudiantes);

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`API escuchando en el puerto ${PUERTO}`);
});
