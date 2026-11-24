import { describe, it, expect } from 'vitest';
import reglas from './reglas-notas.js';

const { estaAprobado, calcularPromedio } = reglas;

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