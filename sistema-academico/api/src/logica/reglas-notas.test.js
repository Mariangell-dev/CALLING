import { describe, it, expect } from 'vitest';
import reglas from './reglas-notas.js';

const { estaAprobado, calcularPromedio, validarNota } = reglas;

describe('estaAprobado', () => {
  it('aprueba una nota por encima del mínimo', () => {
    expect(estaAprobado(4.5)).toBe(true);
  });

  it('reprueba una nota por debajo del mínimo', () => {
    expect(estaAprobado(2.8)).toBe(false);
  });

  it('aprueba la nota exacta de 3.0', () => {
    expect(estaAprobado(3.0)).toBe(true);
  });
});

describe('calcularPromedio', () => {
  it('calcula el promedio de varias notas', () => {
    expect(calcularPromedio([4.5, 3.5, 2.5, 4.0])).toBe(3.625);
  });

  it('devuelve la misma nota si solo hay una', () => {
    expect(calcularPromedio([4.0])).toBe(4.0);
  });
});

describe('casos limite', () => {
  it('devuelve 0 si la lista de notas esta vacia', () => {
    expect(calcularPromedio([])).toBe(0);
  });

  it('acepta las notas de las fronteras 0 y 5', () => {
    expect(validarNota(0)).toBe(true);
    expect(validarNota(5)).toBe(true);
  });

  it('rechaza notas fuera de rango o que no son numeros', () => {
    expect(validarNota(-1)).toBe(false);
    expect(validarNota(5.1)).toBe(false);
    expect(validarNota('4')).toBe(false);
  });
});
