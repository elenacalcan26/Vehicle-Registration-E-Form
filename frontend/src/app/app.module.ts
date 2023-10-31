import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { FormEditorComponent } from './form-editor/form-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
