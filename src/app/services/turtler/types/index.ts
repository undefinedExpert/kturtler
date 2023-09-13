import { Board } from '../board/Board';

export type Point = {
  x: number;
  y: number;
};

export type CommandPayload = {
  command: Command;
  values: CommandValue[];
  lineNumber: number;
};

export type CommandValue = 'string';
export type ValidatorFn = () => void;

export interface Command {
  name: string;
  hasValue: boolean;
  Validate(value: CommandPayload): boolean;
  Perform(value: CommandPayload, board: Board): Promise<void>;
}
