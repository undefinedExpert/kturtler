import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { KrutleLanguageParserService } from 'src/app/services/krutle-language-parser.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  textValue = `center
turnleft 120
forward 100
turnleft 120
forward 100
turnleft 120
penup 
forward 200
pendown
penwidth 10
turnleft 120
forward 100
turnleft 120
forward 100
turnleft 120
forward 100`;
  private textValueSubject: Subject<string> = new Subject();

  private destroy$: Subject<void> = new Subject<void>();
  public lines: number[] = [];
  public isCompleted: boolean | undefined;

  constructor(private turtler: KrutleLanguageParserService) {
    this.SetLinesFromValue(this.textValue);
    this.textValueSubject
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((value: string) => {
        turtler.setProgram(value);
        turtler.run();
      });

    this.turtler.completed.subscribe((v) => {
      this.isCompleted = v;
    });
  }

  SetLinesFromValue(value: string) {
    this.lines = new Array(value.split('\n').length)
      .fill(0)
      .map((_, index) => index + 1);
  }

  handleInput(value: string): void {
    if (!this.isCompleted) {
      return;
    }
    this.textValueSubject.next(value);
    this.SetLinesFromValue(value);
  }

  ngAfterViewInit(): void {
    if (this.textValue.length > 0) {
      this.textValueSubject.next(this.textValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
