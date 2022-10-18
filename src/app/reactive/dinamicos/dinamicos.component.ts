import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    favoritos: this.formBuilder.array([
      ['GTA', Validators.required],
      ['RS', Validators.required]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.formBuilder.control( '', Validators.required );

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get favoritos(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  ngOnInit(): void {
    
  }

  campoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors && 
            this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ) { return; }
    // this.favoritos.push(new FormControl( this.nuevoFavorito.value, Validators.required ));
    this.favoritos.push(this.formBuilder.control( this.nuevoFavorito.value,Validators.required ));
    this.nuevoFavorito.reset();
  }

  eliminarFavorito( indice: number ){
    // this.favoritos.controls.splice( indice, 1);
    this.favoritos.removeAt(indice);
  }

  guardar(){
    if ( this.miFormulario.invalid ) { 
      this.miFormulario.markAllAsTouched();
      return; 
    }
    console.log( this.miFormulario.value );
    this.miFormulario.reset();
  }

}
