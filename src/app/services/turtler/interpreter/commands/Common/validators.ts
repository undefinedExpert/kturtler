import { SyntaxError } from '../../../common/SyntaxError';
import { CommandPayload, CommandValue, ValidatorFn } from '../../../types';
import { GetNumberFromValue } from './Utils';

export const isNumber = (
  payload: CommandPayload,
  value: CommandValue,
): ValidatorFn => {
  return () => {
    if (Number.isNaN(Number(value))) {
      throw new SyntaxError(
        `Command ${payload.command.name} at line ${payload.lineNumber} is has non numeric value`,
        payload,
      );
    }
  };
};

export const isPositive = (
  payload: CommandPayload,
  value: CommandValue,
): ValidatorFn => {
  return () => {
    if (GetNumberFromValue(value) < 0) {
      throw new SyntaxError(
        `Command ${payload.command.name} at line ${payload.lineNumber} has negative value`,
        payload,
      );
    }
  };
};

export const inRange = (
  payload: CommandPayload,
  value: CommandValue,
  min: number,
  max: number,
): ValidatorFn => {
  return () => {
    const number = GetNumberFromValue(value);
    if (number < min || number > max) {
      throw new SyntaxError(
        `Command ${payload.command.name} at line ${payload.lineNumber} has value (${value}) out of range: ${min}, ${max}`,
        payload,
      );
    }
  };
};

export const validate = (...validators: ValidatorFn[]): boolean => {
  for (const validator of validators) {
    validator();
  }

  return true;
};
