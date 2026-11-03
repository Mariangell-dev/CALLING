import { useState } from 'react';

const NOTA_MINIMA = 3.0;

function estaAprobado(nota) {
  return nota >= NOTA_MINIMA;
}

function Boton({ children, alHacerClic, variante = 'primario', cargando = false }) {
  return (
    <button
      className={`boton boton--${variante}`}
      onClick={alHacerClic}
      disabled={cargando}
    >
      {cargando ? 'Procesando...' : children}
    </button>
  );
}

function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana', nota: 4.5 }
  ]);

  function agregar() {
    const nuevo = { id: Date.now(), nombre: 'Nuevo', nota: 3.2 };
    setEstudiantes([...estudiantes, nuevo]);      // uno NUEVO, no push
  }

  return (
    <>
      <h1>Notas</h1>
      <ul>
        {estudiantes.map(e => <li key={e.id}>{e.nombre} - {e.nota}</li>)}
      </ul>
      <Boton alHacerClic={agregar}>Agregar estudiante</Boton>
    </>
  );
}

export default App;