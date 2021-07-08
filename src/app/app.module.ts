import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { PasswordComponent } from './cellRenderers/password/password.component';
import { PinnedRowComponent } from './cellRenderers/pinned-row/pinned-row.component';
import { CrudCellRendererComponent } from './cellRenderers/crud-cell-renderer/crud-cell-renderer.component';


@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    PinnedRowComponent,
    CrudCellRendererComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([PasswordComponent,PinnedRowComponent,CrudCellRendererComponent]),
  ],
  providers: [],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
