import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KrutleLanguageParserService } from './services/krutle-language-parser.service';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor/editor.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { InfobarComponent } from './components/infobar/infobar.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CanvasComponent,
    InfobarComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [KrutleLanguageParserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
