import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';

export default class PenUp implements Command {
  name = 'penup';
  hasValue = false;

  Validate(): boolean {
    return true;
  }

  async Perform(_: CommandPayload, board: Board): Promise<void> {
    board.Cursor.setDrawingDisabled();
  }
}
