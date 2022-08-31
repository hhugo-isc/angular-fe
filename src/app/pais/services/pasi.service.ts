import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
    providedIn: 'root'
})
export class PaisService{
    
    
    private urlBase: string = 'https://restcountries.com/v3.1';
    
    constructor( private http: HttpClient ){}

    get httpParams(){
        return new HttpParams().set('fields','name,capital,cca2,flags,population');
    }
    
    buscarPais( termino: string ): Observable<Country[]>{
        const url = `${this.urlBase}/name/${termino}`;
        return this.http.get<Country[]>(url, { params: this.httpParams});
            // .pipe(
            //     catchError( err => of([]) )
            // );
    }

    buscarCapital( termino: string ): Observable<Country[]>{
        const url = `${this.urlBase}/capital/${termino}`;
        return this.http.get<Country[]>(url, { params: this.httpParams });
    }

    buscarPorRegion( termino: string ): Observable<Country[]>{
        const url = `${this.urlBase}/region/${termino}`;
        return this.http.get<Country[]>(url, { params: this.httpParams });
    }

    buscarPaisPorCodigo( termino: string ): Observable<Country[]>{
        const url = `${this.urlBase}/alpha/${termino}`;
        return this.http.get<Country[]>(url);
    }

}