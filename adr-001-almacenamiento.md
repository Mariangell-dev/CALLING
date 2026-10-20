# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3

- **Fecha:** 20 de octubre de 2026
- **Autor:** Equipo de desarrollo
- **Estado:** Aceptada

## Contexto

El proyecto necesita almacenar sus archivos de forma segura y organizada en Amazon S3. Se requiere definir una estructura de almacenamiento que permita administrar los datos, controlar su acceso y reducir los costos. También es importante conservar las versiones anteriores de los objetos para facilitar su recuperación en caso de errores.

## Decisión

Se decidió utilizar un bucket de Amazon S3 para almacenar los archivos del proyecto, organizándolos mediante prefijos según su categoría. Se mantendrá el acceso privado y se utilizará el versionado para conservar versiones anteriores de los objetos.

Además, se configurará una regla de ciclo de vida llamada `retencion-callingame`, con las siguientes acciones:

- Transición de las versiones actuales a S3 Standard-IA después de 30 días.
- Transición a S3 Glacier Flexible Retrieval después de 90 días.
- Eliminación permanente de las versiones no vigentes después de 180 días.

Esta configuración busca equilibrar el costo del almacenamiento con la disponibilidad y conservación de la información.

## Alternativas consideradas

**1. Almacenar todos los archivos en S3 Standard sin una regla de ciclo de vida.**

Se descartó porque los archivos antiguos continuarían almacenados en una clase de mayor costo, incluso cuando se consulten con poca frecuencia.

**2. Almacenar todos los archivos directamente en Glacier.**

Se descartó porque algunos archivos pueden necesitar consultarse rápidamente y su recuperación desde Glacier puede tardar más tiempo.

**3. Utilizar diferentes clases de almacenamiento mediante una regla de ciclo de vida.**

Se eligió esta alternativa porque permite mover automáticamente los archivos según su antigüedad y reducir los costos de almacenamiento.

## Consecuencias

### Positivas

La configuración permite reducir los costos de almacenamiento, 
mantener los archivos organizados mediante prefijos, conservar versiones anteriores para recuperar información y automatizar
la transición de los archivos entre clases de almacenamiento según su antigüedad.

### Costos o desventajas que aceptamos

La recuperación de archivos desde Glacier puede tardar más tiempo y algunas operaciones pueden generar costos adicionales. 
Además, las versiones no vigentes se eliminarán permanentemente después de 180 días, por lo que ya no podrán recuperarse una vez eliminadas.

### Qué habría que revisar más adelante

