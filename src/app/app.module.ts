import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MuestraNombreComponent } from './components/muestra-nombre/muestra-nombre.component';
import { Pagina1Component } from './pages/pagina1/pagina1.component';

@NgModule({
  declarations: [
    AppComponent,
    MuestraNombreComponent,
    Pagina1Component
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
