import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";

@Component({
    selector: 'app-heroe-tarjeta',
    templateUrl: './heroe-tarjeta.component.html',
    styles: [`
        mat-card{
            margin-top: 20px;
        }
    `]
})  
export class HeroeTarjetaComponent{

    @Input('heroe') heroe!: Heroe;

    constructor(
        private router: Router
    ){}

}