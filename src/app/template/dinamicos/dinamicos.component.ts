import { Component, OnInit } from '@angular/core';

interface Persona{
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  persona: Persona = {
    nombre: 'Hugo',
    favoritos: [
      { id: 1, nombre: 'GTA'},
      { id: 2, nombre: 'RS'}
    ]
  };

  nuevoJuego: string = '';

  agregarFavorito(){
    const nuevoFavorito: Favorito = { id: this.persona.favoritos.length + 1, nombre: this.nuevoJuego };
    this.persona.favoritos.push( {...nuevoFavorito} );
    this.nuevoJuego = '';
  }

  eliminarFavorito( indice: number ){
    this.persona.favoritos.splice( indice, 1 );
  }

  onSubmit(){

  }


}
