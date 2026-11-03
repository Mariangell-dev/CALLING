import { useState } from 'react';
import Boton from './componentes/Boton';
import FilaEstudiante from './funcionalidades/notas/FilaEstudiante';

function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana', nota: 4.5 }
  ]);
  const [nombre, setNombre] = useState('');

  function agregar() {
    if (nombre.trim() === '') return;
    const nuevo = { id: Date.now(), nombre: nombre, nota: 3.2 };
    setEstudiantes([...estudiantes, nuevo]);
    setNombre('');
  }

  return (
    <>
      <h1>Notas</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(e => <FilaEstudiante key={e.id} estudiante={e} />)}
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