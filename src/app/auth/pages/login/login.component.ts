import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    email: ['test1@test.com', [Validators.required, Validators.email], []],
    password: ['test1', [Validators.required, Validators.minLength(5)], []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const { email, password } = this.miFormulario.value;
    this.authService.login( email, password)
      .subscribe( resp => {
        if( resp === true ){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', resp, 'error');
        } 
      });
  }

}
