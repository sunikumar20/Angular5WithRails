import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
// A2tUiModule
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { Employee } from './employee/employee';
import { AboutComponent } from './about/about.component';
import { SessionComponent } from './session/session.component';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { CustomDirective } from './custom.directive'; 


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthenticationService] },
  { path: 'employees/:id', component: EmployeeComponent, canActivate: [AuthenticationService] },
  { path: 'about/:id', component: AboutComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AboutComponent,
    SessionComponent,
    HomeComponent,
    CustomDirective
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService, Angular2TokenService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
