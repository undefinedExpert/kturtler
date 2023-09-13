import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';
import { GetNumberFromValue } from './Common/utils';
import { isNumber, isPositive, validate } from './Common/validators';

export default class Forward implements Command {
  name = 'forward';
  hasValue = true;

  Validate(payload: CommandPayload): boolean {
    const value = payload.values[0];
    return validate(isNumber(payload, value), isPositive(payload, value));
  }

  async Perform(payload: CommandPayload, board: Board): Promise<void> {
    const number = GetNumberFromValue(payload.values[0]);
    const from = { ...board.Cursor.position };
    board.Cursor.forward(number);

    if (!board.Cursor.isDrawingEnabled()) {
      return;
    }

    board.drawLineToCursor(from);
  }
}
