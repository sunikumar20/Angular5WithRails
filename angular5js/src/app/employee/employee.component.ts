import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { Employee } from './employee';
import { log } from 'util';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit, OnChanges {
  empImageFile: File;
  @ViewChild('empImage') Emp_Image;
  @Input() employee: Employee;
  @Output() newEmployee: EventEmitter<Employee> = new EventEmitter();
  title: string;
  public employeeForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
   }

  ngOnChanges() {
    if(this.employee){     
      if(!this.employee.id){
        this.title = 'New Employee';
      }else{
        this.title = 'Update Employee';
      }
      this.employeeForm = this.formBuilder.group({
        id: [this.employee.id],
        firstname: [this.employee.firstname, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
        image: [this.employee.image, Validators.compose([Validators.required])],
      })    
    }
  }

  ngOnInit() { }

  public onSubmit() { 
    console.log(this.Emp_Image)
    // let isFormValid = this.employeeForm.valid;
    // if(isFormValid){
    //   if(this.employee.id){
    //     this.apiService.updateEmployee(<Employee>this.employeeForm.value).subscribe((employee: Employee) => {
    //       this.newEmployee.emit(employee);
    //       this.employeeForm.reset();
    //     })
    //   }else{
    //     this.apiService.createEmployee(<Employee>this.employeeForm.value).subscribe((employee: Employee) => {
    //       this.newEmployee.emit(employee);
    //       this.employeeForm.reset();
    //     })
    //   }
    // } 
  }
}
