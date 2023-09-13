import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';
import { GetNumberFromValue } from './Common/utils';
import { isNumber, isPositive, validate } from './Common/validators';

export default class Gox implements Command {
  name = 'gox';
  hasValue = true;

  Validate(payload: CommandPayload): boolean {
    const value = payload.values[0];
    return validate(isNumber(payload, value), isPositive(payload, value));
  }

  async Perform(payload: CommandPayload, board: Board): Promise<void> {
    const number = GetNumberFromValue(payload.values[0]);
    board.Cursor.moveTo(number, board.Cursor.position.y);
  }
}
