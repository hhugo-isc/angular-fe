import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/ventas.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(heroes: Heroe[], criterio: string = 'sin valor'): Heroe[] {

    // if (criterio === 'sin valor') return heroes;
    // if ( criterio === 'nombre') return heroes.sort((a: Heroe, b: Heroe) => (a.nombre > b.nombre ? 1 : -1));
    // if ( criterio === 'vuela') return heroes.sort((a: Heroe, b: Heroe) => (a.vuela > b.vuela ? 1 : -1));
    // if ( criterio === 'color') return heroes.sort((a: Heroe, b: Heroe) => (a.color > b.color ? 1 : -1));

    switch( criterio ){
      case 'nombre':
        return heroes.sort((a: Heroe, b: Heroe) => (a.nombre > b.nombre ? 1 : -1));
      case 'vuela':  
        return heroes.sort((a: Heroe, b: Heroe) => (a.vuela > b.vuela ? -1 : 1));
      case 'color':
        return heroes.sort((a: Heroe, b: Heroe) => (a.color > b.color ? 1 : -1));
      default: 
        return heroes;
    }
  }

}
