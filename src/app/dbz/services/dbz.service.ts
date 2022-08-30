import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/dbz.interfaces";

@Injectable()
export class DbzService{
    
    constructor(){

    }

    private _personajes: Personaje[] = [
        {
          nombre: 'Goku',
          poder: 15000
        },{
          nombre: 'Vegeta',
          poder: 10000
        }
    ];

    get personajes():Personaje[] {
        return [...this._personajes];
    }

    agregarPersonaje( nuevoPersonaje: Personaje ){
        this._personajes.push(nuevoPersonaje);
    }

}