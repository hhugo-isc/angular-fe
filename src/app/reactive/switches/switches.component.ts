import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit {

  persona = {
    genero: 'F',
    notificaciones: true
  }

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, [Validators.required, Validators.requiredTrue] ]
  });

  // terminosYCondiciones: FormControl = this.formBuilder.control( false, Validators.required)

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.miFormulario.setValue( this.persona );
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });

    this.miFormulario.valueChanges.subscribe( ({condiciones, ...rest}) => {
      // const formValue = {...form };
      // delete form.condiciones;
      this.persona = rest;
    });
  }

  guardar(){
    const formValue = {...this.miFormulario.value };
    delete formValue.condiciones;
    this.persona = formValue;
  }

}
