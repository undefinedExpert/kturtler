import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { KrutleLanguageParserService } from 'src/app/services/krutle-language-parser.service';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss'],
})
export class InfobarComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isCompleted: boolean | undefined;
  public errorMessage = '';

  constructor(private turtler: KrutleLanguageParserService) {
    this.turtler.completed.subscribe((v) => {
      this.isCompleted = v;
    });

    this.turtler.errorMessage.subscribe((v) => (this.errorMessage = v));
  }

  handleRun(): void {
    console.log(this.isCompleted);
    console.log(this.errorMessage);
    this.turtler.run();
    // this.run(this.textValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
