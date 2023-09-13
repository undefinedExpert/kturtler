import { Interpreter } from './Interpreter';
import { SyntaxError } from '../common/SyntaxError';

fdescribe('Interpreter', () => {
  let interpreter: Interpreter;

  beforeEach(() => {
    interpreter = new Interpreter();
  });

  it('should parse valid programs correctly', () => {
    const program = `
      forward 100
    `;

    const result = interpreter.Parse(program);
    expect(result[0].command.name).toEqual('forward');
    expect(result[0].values[0]).toEqual('100');
  });

  it('should throw an error on unrecognized commands', () => {
    const program = `
      invalidcommand 100
    `;

    expect(() => {
      interpreter.Parse(program);
    }).toThrowError(SyntaxError);
  });

  it('should throw an error on missing values for commands', () => {
    const program = `
      forward
    `;

    expect(() => {
      interpreter.Parse(program);
    }).toThrowError(SyntaxError);
  });

  it('should throw an error on unrecognized value types', () => {
    const program = `
      forward invalid
    `;

    expect(() => {
      interpreter.Parse(program);
    }).toThrowError(SyntaxError);
  });

  it('should handle multiple commands in a program', () => {
    const program = `
      forward 100
      backward 50
    `;

    const result = interpreter.Parse(program);
    expect(result.length).toEqual(2);
    expect(result[0].command.name).toEqual('forward');
    expect(result[0].values[0]).toEqual('100');
    expect(result[1].command.name).toEqual('backward');
    expect(result[1].values[0]).toEqual('50');
  });

  it('should ignore blank lines in the program', () => {
    const program = `
      forward 100
      
      backward 50
    `;

    const result = interpreter.Parse(program);
    expect(result.length).toEqual(2);
  });

  it('should trim whitespace from command values', () => {
    const program = `
      forward 100
    `;

    const result = interpreter.Parse(program);
    expect(result[0].values[0]).toEqual('100');
  });
});
