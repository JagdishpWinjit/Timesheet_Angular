import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxPopupModule,
        DxTemplateModule,
        DxDateBoxModule,
        DxDropDownBoxModule,
        DxTreeViewModule,
        DxTextBoxModule,
        DxFileUploaderModule,
        DxFormModule} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation'
import { EmployeeService } from './employee-service';

@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        PageHeaderModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        FormsModule,
        DxButtonModule,
        DxPopupModule,
        HttpModule,
        DxFormModule,
        DxDateBoxModule,
        DxTextBoxModule,
        DxFileUploaderModule,
        DxTemplateModule,
        DxDropDownBoxModule,
        DxTreeViewModule,
        CustomFormsModule
    ],
    providers: [EmployeeService],
    declarations: [EmployeeMasterComponent]
})
export class EmployeeModule { }
