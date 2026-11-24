import { useState, useEffect } from 'react';
import Boton from './componentes/Boton';
import TarjetaEstadistica from './componentes/TarjetaEstadistica';
import FilaEstudiante from './funcionalidades/notas/FilaEstudiante';
import { obtenerEstudiantes, obtenerResumen, crearEstudiante } from './api';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [resumen, setResumen] = useState({ promedio: 0, aprobados: 0, total: 0 });
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setEstudiantes(await obtenerEstudiantes());
      setResumen(await obtenerResumen());
    } catch (e) {
      setError(e.message);
    }
  }

  async function agregar() {
    setError('');
    setCargando(true);
    try {
      // La validacion de verdad la hace el servidor; si algo esta mal, su mensaje se muestra aqui.
      await crearEstudiante(nombre.trim(), nota === '' ? null : Number(nota));
      setNombre('');
      setNota('');
      await cargarDatos();
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
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
      <input
        type="number"
        step="0.1"
        value={nota}
        onChange={e => setNota(e.target.value)}
        placeholder="Nota (0 a 5)"
      />
      <Boton alHacerClic={agregar} cargando={cargando}>Agregar estudiante</Boton>

      {error && <p role="alert">{error}</p>}
    </>
  );
}

export default App;
