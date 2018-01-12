import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthenticationService){}
  logOut() {
    this.authService.logOut();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
