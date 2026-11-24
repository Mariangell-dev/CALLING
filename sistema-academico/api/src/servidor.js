const express = require('express');
const cors = require('cors');
const estudiantes = require('./rutas/estudiantes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/estudiantes', estudiantes);

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`API escuchando en el puerto ${PUERTO}`);
});