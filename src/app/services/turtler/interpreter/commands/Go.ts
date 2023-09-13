import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';
import { GetNumberFromValue } from './Common/utils';
import { isNumber, isPositive, validate } from './Common/validators';

export default class Go implements Command {
  name = 'go';
  hasValue = true;

  Validate(payload: CommandPayload): boolean {
    const x = payload.values[0];
    const y = payload.values[1];
    return validate(
      isNumber(payload, x),
      isPositive(payload, x),
      isNumber(payload, y),
      isPositive(payload, y),
    );
  }

  async Perform(payload: CommandPayload, board: Board): Promise<void> {
    const x = GetNumberFromValue(payload.values[0]);
    const y = GetNumberFromValue(payload.values[1]);
    board.Cursor.moveTo(x, y);
  }
}
