import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map, of, Subscription, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit, OnDestroy{

  public heroe!: Heroe;
  private heroeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroeSubscription = this.route.params
      .pipe(
        switchMap( ({ id }) => this.heroeService.getHeroePorId( id ) )
      ).subscribe( heroe => {
        this.heroe = heroe;
      });
  }

  ngOnDestroy(): void {
    this.heroeSubscription.unsubscribe();
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
