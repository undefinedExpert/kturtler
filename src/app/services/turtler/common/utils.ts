import { CommandValue } from '../types';

export const isCommandValue = (value: unknown): value is CommandValue => {
  return ['string', 'number', undefined].includes(typeof value);
};

export const isValueNumber = (value: number | string): value is number => {
  return typeof value === 'number';
};

export const isSyntaxError = (value: unknown): value is SyntaxError => {
  return value instanceof SyntaxError;
};
export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};
