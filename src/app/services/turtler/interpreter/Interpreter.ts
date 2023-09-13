import { SyntaxError } from '../common/SyntaxError';
import { isCommandValue } from '../common/utils';
import { Command, CommandPayload, CommandValue } from '../types';
import Commands from './commands';

export class Interpreter {
  private _commands: Record<string, Command>;

  constructor() {
    this._commands = this.initCommands();
  }

  private initCommands(): Record<string, Command> {
    return Object.values(Commands)
      .map((v) => new v())
      .reduce((acc, v) => ({ ...acc, [v.name]: v }), {});
  }

  private getCommandByName(name: string): Command {
    return this._commands[name];
  }

  public Parse(program: string): CommandPayload[] {
    const result: CommandPayload[] = [];
    const lines = program.split('\n');

    for (const [i, line] of lines.entries()) {
      const lineNumber = i + 1;
      const trimmedLine = line.trim();
      if (trimmedLine === '') {
        continue;
      }

      const [name, ...values] = trimmedLine.split(/\s+/);
      const command = this.getCommandByName(name);
      const payload = {
        command,
        values: values as CommandValue[],
        lineNumber,
      };

      if (!command) {
        throw new SyntaxError(
          `Unrecognized command: ${name} at line ${lineNumber}`,
          payload,
        );
      }

      if (command.hasValue) {
        if (values.length <= 0) {
          throw new SyntaxError(
            `Command ${name} at line ${lineNumber} has missing value`,
            payload,
          );
        }

        for (const value of values) {
          if (!isCommandValue(value)) {
            throw new SyntaxError(
              `Unrecognized value type of ${name}: ${value} at line ${lineNumber}`,
              payload,
            );
          }
        }

        command.Validate(payload);
      }

      result.push(payload);
    }

    return result;
  }
}
