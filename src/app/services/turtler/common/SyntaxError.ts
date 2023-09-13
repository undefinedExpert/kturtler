import { CommandPayload } from '../types';

export class SyntaxError extends Error {
  payload?: Partial<CommandPayload> | undefined;

  constructor(msg: string, payload?: CommandPayload) {
    super(msg);
    this.payload = payload;
  }
}
