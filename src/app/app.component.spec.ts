import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { InfobarComponent } from './components/infobar/infobar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KrutleLanguageParserService } from './services/krutle-language-parser.service';

fdescribe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EditorComponent,
        CanvasComponent,
        InfobarComponent,
      ],
      imports: [BrowserModule, FormsModule],
      providers: [KrutleLanguageParserService],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
