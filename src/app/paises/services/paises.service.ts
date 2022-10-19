import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, observable, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private url_base: string = 'https://restcountries.com/v2';

  get regiones(){
    return [...this._regiones];
  }

  constructor(
    private http: HttpClient
  ){}

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {
    const url = `${this.url_base}/region/${region}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall[]>( url );
  }

  getPaisPorCodigo( codigo: string ): Observable<Pais | null>{
    if(!codigo){
      return of(null);
    }
    const url = `${this.url_base}/alpha/${codigo}`;
    return this.http.get<Pais>( url );
  }

  getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall>{
    // if(!codigo){
    //   return of(null);
    // }
    const url = `${this.url_base}/alpha/${codigo}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>( url );
  }

  getPaisPorCodigos( borders: string[] ): Observable<PaisSmall[]>{
    if( !borders ){
      return of([]);
    } 
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach( codigo =>{
      const peticion = this.getPaisPorCodigoSmall( codigo );
      peticiones.push( peticion );
    });

    return combineLatest( peticiones );

  }

}
