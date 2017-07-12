import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterComponent } from './employee-master.component';
import {PageHeaderModule} from '../../shared/modules/page-header/page-header.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('EmployeeMasterComponent', () => {
  let component: EmployeeMasterComponent;
  let fixture: ComponentFixture<EmployeeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            PageHeaderModule
        ],
      declarations: [ EmployeeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
