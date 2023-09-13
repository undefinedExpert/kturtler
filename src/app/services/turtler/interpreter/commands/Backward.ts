import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';
import { GetNumberFromValue } from './Common/Utils';
import { isNumber, isPositive, validate } from './Common/validators';

export default class Backward implements Command {
  name = 'backward';
  hasValue = true;

  Validate(payload: CommandPayload): boolean {
    const value = payload.values[0];
    return validate(isNumber(payload, value), isPositive(payload, value));
  }

  async Perform(payload: CommandPayload, board: Board): Promise<void> {
    const number = GetNumberFromValue(payload.values[0]);
    const from = { ...board.Cursor.position };
    board.Cursor.backward(number);

    if (!board.Cursor.isDrawingEnabled()) {
      return;
    }

    board.drawLineToCursor(from);
  }
}
