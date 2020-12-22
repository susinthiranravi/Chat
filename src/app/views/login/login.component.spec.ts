import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule,
        RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('button to be disabled',()=>{
  //   const el = fixture.debugElement.nativeElement;
  //   fixture.detectChanges();
  //   expect(el.querySelector('button').disabled).toBeTruthy();
  // })

  // it('button to be enabled',()=>{
  //   const el = fixture.debugElement.nativeElement;
  //   component.name = 'susi';
  //   fixture.detectChanges();
  //   expect(el.querySelector('button').disabled).toBeFalsy();
  // })
});
