import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Heroe } from "../interfaces/heroe.interface";

@Injectable({
    providedIn: 'root'
})
export class HeroesService{

    private base_url = environment.api_base_url;

    constructor(
        private http: HttpClient
    ){}

    getHeroes(){
        return this.http.get<Heroe[]>(`${this.base_url}/heroes`);
    }

    getHeroePorId( id: string ){
        return this.http.get<Heroe>(`${this.base_url}/heroes/${ id }`);
    }

    getSugerencias( termino: string ): Observable<Heroe[]>{
        return this.http.get<Heroe[]>(`${this.base_url}/heroes?q=${termino}&_limit=6`);
    }

}