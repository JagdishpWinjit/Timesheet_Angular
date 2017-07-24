import { Component, OnInit, ViewChild } from '@angular/core';
import { Response, RequestOptions, Headers, Http } from '@angular/http';
import {
    DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule
} from 'devextreme-angular';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';


import { EmployeeService } from './employee-service';
import { Role } from '../../Modules/Role.module';
import { Category } from '../../Modules/Category.module';
import { SubCategory } from '../../Modules/SubCategory.module';
import { Department } from '../../Modules/Department.module';
import { Employee } from '../../Modules/Employee.module';
import { Router } from '@angular/router';
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
    selectedRole: Role = new Role(0,'--Select--');
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild("fileInput") fileInput;
    
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
    src: string;
    checkActive: boolean;
    responseStatus: Object = [];
    status: boolean;
    archiveStatus: boolean = false;
    cropperSettings: CropperSettings;
    IsActive: boolean;
    emp_code: number;
    emp_name: string;
    emp_address: string;
    password: string;
    DOJ: Date;
    DOL: Date;
    Category: string;
    SubCategory: string;
    department: string;
    file: File;
    OID: string;
    filename: string = '';
    imageSrc: string;
    filesToUpload: Array<File>;
    Roles: Array<Role>;
    role: Role[];
    roleList: any;
    roleIds: string;
    image: string;
    selectedRoleObj: string;
    touchedImg: boolean = false;

    private selectedObj: any;
    private ValueId: number = 0 
    constructor(private _http: Http, private employeeService: EmployeeService, public router: Router) {
        this.filesToUpload = [];
        //using Observable get Employee
        this.observableEmployee = this.employeeService.getEmployee();
        this.observableEmployee.subscribe(
            employee => this.employees = employee,
            error => this.errorMessage = <any>error);
  
      this.showFilterRow = true;
      this.showHeaderFilter = true;
      this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 128;
      this.cropperSettings.height = 128;
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

      this.observableSubCategory = this.employeeService.getSubCategory();
      this.observableSubCategory.subscribe(
          subcategory => this.subcategories = subcategory,
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

  displayPhoto(fileInput) {
      if (fileInput.target.files && fileInput.target.files[0]) {
          const reader = new FileReader();

          reader.onload = ((e) => {
              this.imageSrc = e.target['result'];
          });

          reader.readAsDataURL(fileInput.target.files[0]);
      }
  }

// Uploading File
  fileChangeEvent(fileInput: any) {
      this.touchedImg = true;
      console.log(this.touchedImg);
      this.filesToUpload = <Array<File>>fileInput.target.files;
      this.filename = fileInput.target.files[0]['name'];
      
      if (fileInput.target.files && fileInput.target.files[0]) {
          const reader = new FileReader();

          reader.onload = ((e) => {
              this.imageSrc = e.target['result'];
          });

          reader.readAsDataURL(fileInput.target.files[0]);
      }
      else {
          this.imageSrc = '../../assets/Employee/person.png';
      }
      //this.filesToUpload['e_name'] = e_name;
      console.log(this.filesToUpload);
      this.makeFileRequest("http://localhost:5000/upload",[], this.filesToUpload).then((result) => {
          console.log(result);
      }, (error) => {
          console.error(error);
      });
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
      return new Promise((resolve, reject) => {
          var formData: any = new FormData();
          var xhr = new XMLHttpRequest();
          for (var i = 0; i < files.length; i++) {
              formData.append("uploads[]", files[i], files[i].name);
          }
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.response));
                  } else {
                      reject(xhr.response);
                  }
              }
          }
          xhr.open("POST", url, true);
          xhr.send(formData);
      });
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

//Edit Employee Details
  OnEditingStart(value: any) {
      //this.imageSrc = '../../assets/Employee/person.png';
      this.showContainer = !this.showContainer;    
      this.archiveStatus = true;
      this.image = value.data.Image;
      var dir = 'http://localhost:5000';
      this.emp_name = value.data.EmployeeName;
      this.emp_code = value.data.EmployeeCode;
      this.emp_address = value.data.Email;
      this.DOJ = value.data.DOJ;
      this.DOL = value.data.DOL;
      this.department = value.data.DepartmentId;
      this.IsActive = value.data.IsActive;
      this.OID = value.data.OID;
      
      if (value.data.Image != null) {
          this.imageSrc = dir + value.data.Image;
      }
      else {
          this.imageSrc = '../../assets/Employee/person.png';
      }
      this.Category = value.data.CategoryOID;
      this.SubCategory = value.data.SubCategoryOID;
      this.roleIds = value.data.RollIds;
      var Ids = this.roleIds.split(',');
      for (var i in Ids) {
          console.log(Ids[i]);
          this.selectedRoleObj = Ids[i];
      }
  }

//Clear All Fields
  clearFields()
  {
      this.imageSrc = '../../assets/Employee/person.png';
      this.showContainer = !this.showContainer;
      this.archiveStatus = false;
      this.emp_name = '';
      this.emp_code = 0;
      this.emp_address = '';
      this.DOJ = null;
      this.DOL = null;
      this.Category = '';
      this.SubCategory = '';
      this.department = '';
      this.IsActive = true;
  }

  ViewContainer() {
      this.clearFields();
  }

  CancelAdd()
  {
      this.showContainer = !this.showContainer;
  }

//get Sub Category
  Onselect(category_id) {
      this.observableSubCategory = this.employeeService.getsubCategory(category_id);
      this.observableSubCategory.subscribe(
          subcategories => { this.subcategories = subcategories; console.log() },
          error => this.errorMessage = <any>error);
      this.subcategories.filter((item) => item.CategoryOID == category_id)
  }

  calculateCellValue(data) {
      return [data.Title, data.FirstName, data.LastName].join(" ");
  }

//submit Employee Details
  OnSubmit(value: any) {
      value['filename'] = this.filename;
      value.DateOfJoining = new Date(value.DateOfJoining);
      value.DateOfLeaving = new Date(value.DateOfLeaving);
      this.employeeService.addEmployee(value).subscribe(
          data => {
              alert("Employee Inserted Successfully");
              window.location.reload();
          },
              err => {
              alert('server Error');
            });
      this.status = true;
  }

//Update Employee details
  OnUpdate(value: any) {
      if (this.touchedImg == true) {
          value['filename'] = this.filename;
      }
      else {
          var filename = this.image.replace(/^.*[\\\/]/, '');

          var Imagesrc = filename.substr(filename.indexOf(' ') + 1);

          value['filename'] = Imagesrc;
      }
      value.DateOfJoining = new Date(value.DateOfJoining);
      value.DateOfLeaving = new Date(value.DateOfLeaving);
     
     
      this.employeeService.UpdateEmployeeData(value).subscribe(
              data => {
                  //console.log(this.responseStatus = data);
                  alert("Employee Updated Successfully");
                  window.location.reload();
              },
              err => {
                  console.log(err);
                  alert('server Error');
              }
         );
  }

  //Edit employee Info
  showEditContainer(employee: Employee) {
      this.imageSrc = '../../assets/Employee/person.png';
      this.showContainer = !this.showContainer;
      this.archiveStatus = !this.archiveStatus;
      console.log(employee);
  }

//Row Click Event
  //onCellPrepared(value: Employee) {
  //    this.archiveStatus = true;
  //    this.imageSrc = '../../assets/Employee/person.png';
  //    this.showContainer = !this.showContainer;     
  //}

}
