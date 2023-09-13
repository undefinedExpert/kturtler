import { Board } from '../../board/Board';
import { Command, CommandPayload } from '../../types';

export default class Center implements Command {
  name = 'center';
  hasValue = false;

  Validate(): boolean {
    return true;
  }

  async Perform(_: CommandPayload, board: Board): Promise<void> {
    board.center(board.Cursor);
  }
}
