export default function FilaEstudiante({ estudiante }) {
  return (
    <tr>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.nota}</td>
      <td>{estudiante.estado}</td>
    </tr>
  );
}