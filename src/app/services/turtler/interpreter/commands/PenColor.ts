import { Board } from '../../board/Board';
import { Color } from '../../board/Color';
import { Command, CommandPayload, CommandValue } from '../../types';
import { GetNumberFromValue } from './Common/Utils';
import { isPositive, inRange, validate, isNumber } from './Common/validators';

export default class PenWidth implements Command {
  name = 'pencolor';
  hasValue = true;

  private rules(payload: CommandPayload, value: CommandValue) {
    return [
      isNumber(payload, value),
      isPositive(payload, value),
      inRange(payload, value, 0, 255),
    ];
  }

  Validate(payload: CommandPayload): boolean {
    const r = payload.values[0];
    const g = payload.values[1];
    const b = payload.values[2];
    return validate(
      ...this.rules(payload, r),
      ...this.rules(payload, g),
      ...this.rules(payload, b),
    );
  }

  async Perform(payload: CommandPayload, board: Board): Promise<void> {
    const r = GetNumberFromValue(payload.values[0]);
    const g = GetNumberFromValue(payload.values[1]);
    const b = GetNumberFromValue(payload.values[2]);
    board.Cursor.setPenColor(new Color(r, g, b));
  }
}
