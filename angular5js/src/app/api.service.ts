import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { FlashMessagesService } from 'ngx-flash-messages';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from './employee/employee';

@Injectable()
export class ApiService {
  private url = '/api/employees';
  headers: Headers;
  options: RequestOptions;
  errorMessage: '';
  constructor(private _http: Http) { 
    this.headers = new Headers({
      'Content-Type':'Application/json',
      "access-token": localStorage.getItem('accessToken'),
      "client": localStorage.getItem('client'),
      "uid": localStorage.getItem('uid')
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  public getEmployees(): Observable<Employee[]>{
    return this._http.get(this.url, this.options).map((res: Response)=> res.json() ).catch(this.handleError);
  }

  public getEmployee(id: number): Observable<Employee>{
    return this._http.get(`${this.url}/${id}`).map((res: Response)=> res.json() ).catch(this.handleError);
  }

  createEmployee(employee: Employee): Observable<Employee> {
		return this._http.post(this.url, employee, this.options).map((res: Response) => res.json());
  }

  updateEmployee(employee: Employee): Observable<Employee> {
		return this._http.put(`${this.url}/${employee.id}`, employee, this.options).map((res: Response) => res.json());
  }
  
  deleteEmployee(employee: Employee): Observable<any> {
		return this._http.delete(`${this.url}/${employee.id}`, this.options).map((res: Response) => res.json());
  }

  // public getData(): Observable<Employee>{
  //   return this._http.get(this.url).map((response: Response) => response.json())
  //   .map(({firstName, lastName}) => new Employee(firstName, lastName));
  // }


  private handleError(error: any): Promise<any> {
		console.log("an errors occured", error);
		return Promise.reject(error.message || error);
	}

}
