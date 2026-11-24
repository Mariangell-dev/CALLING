
import { useState, useEffect } from 'react';
import Boton from './componentes/Boton';
import TarjetaEstadistica from './componentes/TarjetaEstadistica';
import FilaEstudiante from './funcionalidades/notas/FilaEstudiante';
const NOTA_PREDETERMINADA = 3.2;

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [resumen, setResumen] = useState({ promedio: 0, aprobados: 0, total: 0 });
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  async function cargarEstudiantes() {
    const respuesta = await fetch('http://localhost:3000/estudiantes');
    const datos = await respuesta.json();
    setEstudiantes(datos);

    const respuestaResumen = await fetch('http://localhost:3000/estudiantes/resumen');
    const datosResumen = await respuestaResumen.json();
    setResumen(datosResumen);
  }

  async function agregar() {
    if (nombre.trim() === '') return;

    const respuesta = await fetch('http://localhost:3000/estudiantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, nota: NOTA_PREDETERMINADA })
    });

    if (respuesta.ok) {
      setNombre('');
      cargarEstudiantes();
    }
  }

  return (
    <>
      <h1>Notas</h1>

      <TarjetaEstadistica titulo="Promedio" valor={resumen.promedio} />
      <TarjetaEstadistica titulo="Aprobados" valor={resumen.aprobados} />
      <TarjetaEstadistica titulo="Total" valor={resumen.total} />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(e => (
            <FilaEstudiante key={e.id} estudiante={e} />
          ))}
        </tbody>
      </table>

      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre del estudiante"
      />
      <Boton alHacerClic={agregar}>Agregar estudiante</Boton>
    </>
  );
}

export default App;