import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pasi.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor( 
    private rutaActiva: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params.pipe(
      switchMap(({id})=> this.paisService.buscarPaisPorCodigo( id )),
      tap( console.log )
    ).subscribe( pais => {
      this.pais = pais[0];
    });
    //   this.rutaActiva.params
    //     .subscribe( ({ id }) => {

    //       this.paisService.buscarPaisPorCodigo( id )
    //         .subscribe( pais => {
    //           console.log(pais);
    //       });

    //     });
    // }
  }

}
