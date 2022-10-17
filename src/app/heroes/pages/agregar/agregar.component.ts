import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit, OnDestroy {

  public publishers = [{
    id: 'DC Comics',
    desc: 'DC - Comics'
  }, {
    id: 'Marvel Comics',
    desc: 'Marvel - Comics'
  }];

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  private heroeSubscription!: Subscription;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    if ( !this.router.url.includes('editar') ) { return; }

    this.heroeSubscription = this.route.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroePorId( id ))
    ).subscribe( ( heroe ) => {
      this.heroe = heroe;
    });

  }

  ngOnDestroy(): void {
    if ( this.heroeSubscription ) { this.heroeSubscription.unsubscribe(); }
  }

  onSave(){
    if( this.heroe.superhero.trim().length === 0 ){ return; }

    if( this.heroe.id ){
      this.heroesService.editarHeroe( this.heroe )
        .subscribe( heroe => {
          this.heroe = heroe;
          this.mostrarSnakbar('Heroe actualizado');
        });
    }else{
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnakbar('Heroe creado');
        });
    }
  }

  onDelete(){

    const dialog = this._matdialog.open( ConfirmarComponent, { width: '300px', data: this.heroe } );

    dialog.afterClosed()
      .pipe( 
        switchMap( result => result ? this.heroesService.borrarHeroe( this.heroe.id! ): of(''))
      )
      .subscribe( (resp ) => (this.router.navigate(['/heroes'])))

  }

  mostrarSnakbar( mensaje: string ){
    this._snackbar.open( mensaje, 'Ok!', { duration: 2000 } );
  }

}
