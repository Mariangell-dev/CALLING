   import { estaAprobado } from './reglas';

   export default function FilaEstudiante({ estudiante }) {
     const estado = estaAprobado(estudiante.nota) ? 'Aprobado' : 'Reprobado';
     return (
       <tr>
         <td>{estudiante.nombre}</td>
         <td>{estudiante.nota}</td>
         <td>{estado}</td>
       </tr>
     );
   }