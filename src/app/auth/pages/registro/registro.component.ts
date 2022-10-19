import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)],[]],
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)],[ this.emailValidator ]],
    username: ['',[Validators.required,],[this.validatorService.noPuedeSerStrider]],
    password: ['',[Validators.required,Validators.minLength(6)],[]],
    password2: ['',[Validators.required,],[]]
  },{
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });

  get emailErrorMgs(){
    const emailControl = this.miFormulario.get('email');
    if( emailControl?.hasError('required') ){
      return 'El email es obligatorio';
    }else if( emailControl?.hasError('pattern')){
      return 'El email no es valido';
    }else if( emailControl?.hasError('emailTomado')){
      return 'El email ya fue tomado';
    }

    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Hugo H',
      email: 'test1@test.com',
      username: 'hugo h'
    });
  }

  campoInvalido( campo: string ){
    return this.miFormulario.get(campo)?.invalid &&
            this.miFormulario.get(campo)?.touched;
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.hasError('required') &&
  //           this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.hasError('pattern') &&
  //           this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.hasError('emailTomado') &&
  //           this.miFormulario.get('email')?.touched;
  // }

  onSubmit(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
