import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  // agregar( event:Event ){
    
  //   event.preventDefault();
  //   console.log('hey!');
  // }

  constructor( ){}
  //personajes: Personaje = [];

  nuevo: Personaje = {
    nombre: 'Trunks',
    poder: 14000
  }

}
