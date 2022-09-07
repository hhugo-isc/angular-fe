import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html'
})
export class NoComunesComponent {

  // i18nSelect
  nombre: string = 'Fernando';
  genero: string = 'masculino';


  // i28nPlural
  clientes: string[] = ['Maria', 'Pedro', 'Hernando', 'Eduardo', 'Fernando'];

  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  clientesMapa = {
    '=0': 'no tenemos ningun cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 clientes esperando.',
    'other': 'tenemos # clientes esperando.'
  }

  cambiarPersona(){
    this.nombre = 'Maria';
    this.genero = 'femenino';
  } 

  borrarPersona(){
    this.clientes.pop();
  }

  // KeyValuePipe

  persona = {
    nombre: 'Fernando',
    edad: 35,
    direccion: 'Otawa, Canada'
  }

  // JSON Pipe
  heroes = [
    {nombre: 'Superman', value: true},
    {nombre: 'Robin', value: false},
    {nombre: 'Aquaman', value: false}
  ];

  // Async Pipe
  miObservable = interval(1000);
  valorPromesa = new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve('Tenemos data de promesa');
    }, 3500);
  });

}
