import { Component } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interfaces';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html'
})
export class OrdenarComponent  {

  esMayusculas: boolean = true;

  heroes: Heroe[] = [
    { nombre: 'Superman', vuela: true, color: Color.azul },
    { nombre: 'Batman', vuela: false, color: Color.negro},
    { nombre: 'Robin', vuela: false, color: Color.verde},
    { nombre: 'Daredevil', vuela: false, color: Color.rojo},
    { nombre: 'Linterna Verde', vuela: true, color: Color.verde }
  ];

  criterioDeOrden: string = 'sin valor';

  cambiarValor(){
    this.esMayusculas = !this.esMayusculas;
  }

  cambiarCriterioDeOrden( criterio: string = 'sin valor'){
    this.criterioDeOrden = criterio;
  }

}
