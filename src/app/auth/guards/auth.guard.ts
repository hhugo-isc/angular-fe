import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.authService.verificaAutentificacion()
            .pipe(
                tap( estaAutenticado => {
                    if( !estaAutenticado ){ this.router.navigate(['/auth/login']) }
                })
            );

    }

    canLoad(route: Route, segments: UrlSegment[]): boolean |  Observable<boolean> {
        return this.authService.verificaAutentificacion()
            .pipe(
                tap( estaAutenticado => {
                    if( !estaAutenticado ){ this.router.navigate(['/auth/login']) }
                })
            );
    }

}