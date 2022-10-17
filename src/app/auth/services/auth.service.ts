import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Auth } from "../interfaces/auth.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    
    private base_url = environment.api_base_url;
    private _auth: Auth | undefined;

    constructor(
        private http: HttpClient
    ){}

    get auth(): Auth{
        return {...this._auth! };
    }

    verificaAutentificacion(): Observable<boolean>{
        if( !localStorage.getItem('token') ){ return of(false) };
        return this.http.get<Auth>(`${this.base_url}/usuarios/1`)
            .pipe(
                map( auth => {
                    this._auth = auth;
                    return true;
                })
            )
    }

    login(): Observable<Auth>{
        return this.http.get<Auth>(`${this.base_url}/usuarios/1`)
            .pipe(
                tap( auth => ( this._auth = auth )),
                tap( auth => ( localStorage.setItem('token', auth.id ) ))
            );
    }

    logout(){
        localStorage.removeItem('token');
        this._auth = undefined;
    }

}