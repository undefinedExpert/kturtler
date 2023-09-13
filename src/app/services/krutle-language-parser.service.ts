import { Injectable } from '@angular/core';
import { Interpreter } from './turtler/interpreter/Interpreter';
import { CommandPayload } from './turtler/types';
import { Board } from './turtler/board/Board';
import { delay } from '../utils/utils';
import { isError, isSyntaxError } from './turtler/common/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KrutleLanguageParserService {
  private interpreter: Interpreter;
  private board: Board;
  private program: BehaviorSubject<string> = new BehaviorSubject('');
  public completed: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public errorMessage: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.interpreter = new Interpreter();
    this.board = new Board();
  }

  private parse(): CommandPayload[] {
    return this.interpreter.Parse(this.program.getValue());
  }

  private async invoke(commandPayloads: CommandPayload[]) {
    this.board.clear();

    for (const payload of commandPayloads) {
      await payload.command.Perform(payload, this.board);
      await delay(250);
    }
  }

  setProgram(program: string) {
    this.program.next(program);
  }

  resize() {
    this.board.resize();
  }

  init(canvas: HTMLCanvasElement, cursor: HTMLElement) {
    this.board.setCanvas(canvas);
    this.board.setCursor(cursor);
  }

  async run(): Promise<void> {
    if (!this.completed) {
      return;
    }

    this.completed.next(false);
    this.errorMessage.next('');

    try {
      if (!this.board.hasCanvas()) {
        throw new Error('Initialise before running the program.');
      }

      const commands = this.parse();
      await this.invoke(commands);
    } catch (e) {
      if (isSyntaxError(e) || isError(e)) {
        this.errorMessage.next(e.message);
      }

      console.error(e);
    }

    this.completed.next(true);
  }
}
