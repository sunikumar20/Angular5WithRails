import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  regForm: FormGroup;
  submited: boolean;

  constructor(
    private tokenService: Angular2TokenService, 
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    // this.tokenService.init({
    //   registerAccountPath: '/api/auth'
    // })
    this.regForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      // 'password_confirmation': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }


  isLoggedOut(): boolean{
    return !this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logOut();
  }

  signUp(){
    this.tokenService.registerAccount({
      email:                'example1@example.org',
      password:             'secretPassword',
      passwordConfirmation: 'secretPassword'
    }).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }

  submitForm() {
    this.submited = true;
    let value = this.regForm.value;
    if(!this.regForm.valid){ return }
    this.authService.logIn(value.email, value.password).subscribe((res) => {
      this.authService.redirectAfterLogin.bind(this.authService)
    })
  }


}
