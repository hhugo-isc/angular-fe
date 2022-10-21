import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: Usuario;

  constructor(
    private http: HttpClient
  ) {}

  get usuario(){
    return {...this._usuario};
  }

  login( email: string, password: string ){
    const url = `${environment.baseUrl}/auth/`;
    const body = { email, password };
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( response => {
          if ( response.ok ) {

            localStorage.setItem('token', response.token!);

            this._usuario = {
              uid: response.uid!,
              name: response.name!,
              email: email
            }

          }
        }),
        map( ( response ) => (response.ok)),
        catchError( error => of(error.error.msg))
      );
  }

  registro(name: string, email:string, password:string){
    const url = `${environment.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ({ ok, token }) => {
          if ( ok ) {
            localStorage.setItem('token', token!);
          }
        }),
        map( ( response ) => (response.ok)),
        catchError( error => of(error.error.msg))
      );
  }
  
  validarToken(): Observable<boolean> {
    const url  = `${environment.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')||'');
    return this.http.get<AuthResponse>( url, { headers })
      .pipe(
        map( response => {
          localStorage.setItem('token', response.token!);
          this._usuario = {
            name: response.name!,
            uid: response.uid!,
            email: response.email!
          }
          return response.ok;
        }),
        catchError( err => of(false))
      );
  }

  logout(){
    localStorage.removeItem('token');
  }


}
