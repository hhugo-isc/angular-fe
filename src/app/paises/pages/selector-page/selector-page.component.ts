import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuiler.group({
    region: ['', [ Validators.required ], []],
    pais: ['', [Validators.required], []],
    frontera: ['', [Validators.required], []]
  });

  // llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];
  cargando: boolean = false;

  constructor(
    private formBuiler: FormBuilder,
    private paisesService: PaisesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // CUando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( _region => {
          this.paises = [];
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( ( region: string ) => this.paisesService.getPaisesPorRegion( region ))
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( _pais => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap( ( codigo: string ) => this.paisesService.getPaisPorCodigo( codigo ) ),
        switchMap( ( pais => this.paisesService.getPaisPorCodigos( pais?.borders! ) ))
      )
      .subscribe( paises => {
          // this.fronteras = pais?.borders || [];
          this.fronteras = paises;
          this.cargando = false;
      });
  }

  guardar(){

  }

}
