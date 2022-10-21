import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    name: ['test4', [Validators.required], []],
    email: ['test4@test.com', [Validators.required, Validators.email], []],
    password: ['test4', [Validators.required, Validators.minLength(5)], []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const { name, email, password } = this.miFormulario.value;
    this.authService.registro( name, email, password )
      .subscribe( resp => {
        if( resp === true ){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', resp, 'error');
        } 
      });
  }

}
