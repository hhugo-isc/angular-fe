import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent implements OnInit {

  @ViewChild('f') miFormulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
    
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid && 
            this.miFormulario?.controls['producto']?.touched;
  }

  precioInvalido(): boolean {
    return this.miFormulario?.controls['precio']?.touched &&
      this.miFormulario?.controls['precio']?.value < 0;
  }

  onSubmnit(){
    console.log( this.miFormulario.value );
    this.miFormulario.reset();
  }

}