import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Subscription,
  fromEvent,
  debounceTime,
  takeUntil,
  Subject,
} from 'rxjs';
import { KrutleLanguageParserService } from 'src/app/services/krutle-language-parser.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('canvas')
  private canvas!: ElementRef;

  @ViewChild('cursor')
  private cursor!: ElementRef;
  private resizeSubscription: Subscription | undefined;
  constructor(private turtler: KrutleLanguageParserService) {}

  ngAfterViewInit(): void {
    this.turtler.init(this.canvas.nativeElement, this.cursor.nativeElement);

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(this.resize);
  }

  resize = () => {
    this.turtler.resize();
  };
}
