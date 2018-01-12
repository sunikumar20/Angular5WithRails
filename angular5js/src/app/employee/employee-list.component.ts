import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Employee } from './employee';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeListComponent implements OnInit {
  // 1.
  model = [{
    firstname:'sdf',
    secondname: 'sdfs'
  }];
  employees: Employee[];
  showEmployee: Employee;
  // 2. 
  public employeeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, private apiService: ApiService,
    private router: Router, private authService: AuthenticationService 
  ) {
    this.getEmployees();

  }

  ngOnInit() {
    console.log(this.authService.ccurrentUserData())
    // this.employeeForm = new FormGroup({
    //   firstname: new FormControl('', {
    //     validators: Validators.required,
    //     // updateOn: 'change'
    //   })
    // }, {updateOn: 'change'})
    // Same things---------------------------
    this.employeeForm = this.formBuilder.group({
      firstname: new FormControl('', {
        validators: Validators.required,
        // updateOn: 'change'
      })
    }, {updateOn: 'change'});
  }

  public getEmployees(){
    this.apiService.getEmployees().subscribe((res) => this.employees = res )
  }

  public getEmployee(id){
    // this.apiService.getEmployee(id).subscribe((res) => this.employees = res )
  }
  public onSubmit() { 
    let isFormValid = this.employeeForm.valid;
    if(isFormValid){
      this.employeeForm.reset();
  }
    
  }
  public onSelect(){

  }

  goToShow(employee: Employee): void {
    this.showEmployee = employee;
  }
  
  createEmployee(): void { 
    this.showEmployee = new Employee('', '');
  }

  changesInEmployee(employee){
    let itemIndex = this.employees.findIndex(item => item.id == employee.id);
    if(itemIndex > -1){
      this.employees[itemIndex] = employee;
    }else{
      this.employees.unshift(employee);
    }
    this.createEmployee();
    console.log(employee);
  }

  deleteEmployee(employee: Employee): void {
    this.apiService.deleteEmployee(<Employee>employee).subscribe((res) => {
      if(res.deleted){
        const index: number = this.employees.indexOf(employee);
        if (index !== -1) {
          this.employees.splice(index, 1);
        }
      }
    })
  }

}
