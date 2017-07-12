import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import {
    DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule
} from 'devextreme-angular';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


import { EmployeeService } from './employee-service';
import { Role } from '../../Modules/Role.module';
import { Category } from '../../Modules/Category.module';
import { SubCategory } from '../../Modules/SubCategory.module';
import { Department } from '../../Modules/Department.module';
import { Employee } from '../../Modules/Employee.module';

@Component({
    selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss'],
  providers: [EmployeeService],
  styles: [`input.ng-invalid{border-left: 5px solid red;}
           input.ng-valid{border-left:5px solid green;}`]
})

export class EmployeeMasterComponent implements OnInit {
    selectedCategory: Category = new Category(0, '--Select--');
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild('personalInfo') personalInfo;
    
    showContainer: boolean = false;
    saleAmountHeaderFilter: any;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    popupVisible = false;
   
    observableRole: Observable<Role[]>
    roles: Role[];
    errorMessage: String;

    observableCategory: Observable<Category[]>;
    categories: Category[];

    observableSubCategory: Observable<SubCategory[]>;
    subcategories: SubCategory[];

    observableDepartment: Observable<Department[]>;
    departments: Department[];

    observableEmployee: Observable<Employee[]>;
    employees: Employee[];

    demoChk = [];
    file: File;
    src: string;
    checkActive: boolean;
    responseStatus: Object = [];
    status: boolean;
    constructor(private employeeService: EmployeeService) {
        //using Observable get Employee
        this.observableEmployee = this.employeeService.getEmployee();
        this.observableEmployee.subscribe(
            employee => this.employees = employee,
            error => this.errorMessage = <any>error);
     // this.employee = employeeService.getEmployee();
      this.showFilterRow = true;
      this.showHeaderFilter = true;
      this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    }

  ngOnInit() {
      //using Observable get Role
      this.observableRole = this.employeeService.getRoleWithObservable();
      this.observableRole.subscribe(
          roles => this.roles = roles,
          error => this.errorMessage = <any>error);

      //using Observable get category
      this.observableCategory = this.employeeService.getCategory();
      this.observableCategory.subscribe(
          category => this.categories = category,
          error => this.errorMessage = <any>error);

      //using Observable get Depatment
      this.observableDepartment = this.employeeService.getDepartment();
      this.observableDepartment.subscribe(
          department => this.departments = department,
          error => this.errorMessage = <any>error);
      
  }

  getOrderDay(rowData) {
      return (new Date(rowData.OrderDate)).getDay();
  }



  orderHeaderFilter(data) {
      data.dataSource.postProcess = (results) => {
          results.push({
              text: "Weekends",
              value: [
                  [this.getOrderDay, "=", 0],
                  "or", [this.getOrderDay, "=", 6]
              ]
          });

          return results;
      };
  }

  Checked(value, event) {
      if (event.target.checked) {
          this.demoChk.push(value);
      }
      else if (!event.target.checked) {
          let indexx = this.demoChk.indexOf(value);
          this.demoChk.splice(indexx, 1);
      }
      
  }

  handleUpload(event) {
      //let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
      //let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
      //let files: FileList = target.files;
      //this.file = files[0];
      //console.log(this.file);
      let file = event.target.files;
      this.src = file;
      console.log(file);
  }

  aciveCheck(e) {
      if (e.target.checked) {
          this.aciveCheck = e.target.checked;
          console.log(this.aciveCheck);
      } else {
          console.log("unchecked");
      }
  }

  ViewContainer() {
     
      this.showContainer = !this.showContainer;
  }

  CancelAdd()
  {
      this.showContainer = !this.showContainer;
  }

//get Sub Category
  Onselect(category_id) {
      this.observableSubCategory = this.employeeService.getsubCategory(category_id);
      this.observableSubCategory.subscribe(
          subcategories => this.subcategories = subcategories,
          error => this.errorMessage = <any>error);
      this.subcategories.filter((item) => item.CategoryOID == category_id)
  }

  calculateCellValue(data) {
      return [data.Title, data.FirstName, data.LastName].join(" ");
  }

  OnSubmit(value: any) {
      console.log(this.demoChk);

      value['Role'] = this.demoChk;
      console.log(value);
      this.employeeService.addEmployee(value).subscribe(
          data => console.log(this.responseStatus = data),
          err => console.log(err),
          () => console.log("Request Completed"));
      this.status = true;
  }

}
