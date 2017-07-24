import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Role } from '../../Modules/Role.module';
import { Category } from '../../Modules/Category.module';
import { SubCategory } from '../../Modules/SubCategory.module';
import { Department } from '../../Modules/Department.module';
import { Observable } from 'rxjs';
import { Employee } from '../../Modules/Employee.module';
import { Headers } from '@angular/http';

@Injectable()
export class EmployeeService {
   // private _url = '../Services/server.js';
    data: any;
    private baseUrl = 'http://localhost:5000/';

    constructor(private _http: Http) { }


    //using Observable get Role Service
    getRoleWithObservable(): Observable<Role[]> {
        return this._http.get(this.baseUrl + 'Role')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //using Observable get Category Service
    getCategory(): Observable<Category[]> {
        return this._http.get(this.baseUrl + 'Emp_category')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //using Observable get sub Category Service
    getsubCategory(category_id: string): Observable<SubCategory[]> {
        return this._http.get(this.baseUrl + 'Emp_sub_category/' + category_id)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    //using Observable get Department Service
    getDepartment(): Observable<Department[]> {
        return this._http.get(this.baseUrl + 'department')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //get subcategory
    getSubCategory(): Observable<SubCategory[]>
    {
        return this._http.get(this.baseUrl + 'sub_category')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

   

    //get Employee Data
    getEmployee(): Observable<Employee[]> {
        return this._http.get(this.baseUrl + 'Employee_data')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getSingleEmployee(emp_code: number): Observable<Employee[]>
    {
        return this._http.get(this.baseUrl + 'Single_Employee/' + emp_code)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    

    //Insert Employee data
    addEmployee(employee: Employee): Observable<Employee> {
        console.log("Employee", employee);
        //this.data = JSON.parse(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.baseUrl + 'Add_Employee/', employee, options).map(res => res.text() ? res.json() : res)
            //.map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //Update employee Data
    UpdateEmployeeData(employee: Employee): Observable<Employee> {
        console.log("Employee", employee);
        //this.data = JSON.parse(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.baseUrl + 'update_employee/', employee, options).map(res => res.text() ? res.json() : res)
            //.map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }



   
}
