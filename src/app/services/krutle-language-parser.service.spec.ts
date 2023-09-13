import { TestBed } from '@angular/core/testing';

import { KrutleLanguageParserService } from './krutle-language-parser.service';
import { Interpreter } from './turtler/interpreter/Interpreter';
import { Board } from './turtler/board/Board';

fdescribe('KrutleLanguageParserService', () => {
  let service: KrutleLanguageParserService;
  let mockInterpreter: jasmine.SpyObj<Interpreter>;
  let mockBoard: jasmine.SpyObj<Board>;

  beforeEach(() => {
    mockInterpreter = jasmine.createSpyObj('Interpreter', ['Parse']);
    mockBoard = jasmine.createSpyObj('Board', [
      'clear',
      'resize',
      'setCanvas',
      'setCursor',
      'hasCanvas',
    ]);

    TestBed.configureTestingModule({
      providers: [
        KrutleLanguageParserService,
        { provide: Interpreter, useValue: mockInterpreter },
        { provide: Board, useValue: mockBoard },
      ],
    });

    service = TestBed.inject(KrutleLanguageParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set program', () => {
    const program = 'center';
    service.setProgram(program);
    expect(service['program'].getValue()).toEqual(program);
  });
});
