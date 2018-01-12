import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthenticationService implements CanActivate {
  redirectUrl: string;

  constructor(private tokenService: Angular2TokenService, private route: Router) { 
    this.tokenService.init({
      registerAccountPath:        '/api/auth',
      signInPath:                 'api/auth/sign_in',
      signInRedirect:             null,
      signInStoredUrlStorageKey:  null,
      signOutPath:                'api/auth/sign_out',
      validateTokenPath:          'api/auth/validate_token',
      signOutFailedValidate:      false,
      globalOptions: {
        headers: {
          'Content-Type':  'application/json',
          'Accept':  'application/json',
          "access-token": localStorage.getItem('accessToken'),
          "client": localStorage.getItem('client'),
          "uid": localStorage.getItem('uid')
        }
      }
    })
    // this.tokenService.validateToken().subscribe(
    //   res =>      console.log(res),
    //   error =>    console.log(error)
    // );
  }

  logIn(email: string, password: string): Observable<Response>{
    return this.tokenService.signIn({ email: email, password: password })
  }

  signUp(email: string, password: string): Observable<Response>{
    return this.tokenService.registerAccount({
      email: email,
      password: password,
      passwordConfirmation: password
    })
  }

  logOut(): void {
    this.redirectUrl = undefined;
    this.tokenService.signOut();
    this.route.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  redirectAfterLogin(): void {
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.route.navigate([redirectTo]);
  }

  redirectToFailedToken(): void{
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.route.navigate([redirectTo]);
  }
  
  ccurrentUserData(): any{
    return {}
    // return this.tokenService.currentUserData();
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    let authenticated: boolean;
    this.tokenService.validateToken().subscribe(
      (res: Response) => { 
        authenticated = true;
      },
      (error: Response) => {
        if(!error.json().success){
          authenticated = false;
          this.logOut();
        }
      }
    );
    return authenticated = true;;
  }
}
