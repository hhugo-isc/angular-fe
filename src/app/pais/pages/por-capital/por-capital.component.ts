import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pasi.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {
  
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  
  constructor( private paisService: PaisService){}

  buscarCapital( termino: string ){
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( termino )
      .subscribe( ( paises ) => { 
          this.paises = paises;
        }, ( err )=>{
          this.hayError = true;
          this.paises = [];
        });
  }

  sugerenciasCapital( termino: string ){
    this.hayError = false;
  }


}
