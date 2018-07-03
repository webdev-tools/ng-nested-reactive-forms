import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NrfModelModule } from '.';
import { NrfFormModule } from '../form';
import { NrfControlOptionsComponent } from './control-options.component';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';

describe('control-options.component', () => {
  /* tslint:disable component-selector */
  @Component({
    selector: 'test-component',
    template: ``,
  })
  class TestComponent extends NrfControlOptionsComponent {}

  @Component({
    template: `<test-component
      [validatorDisabled]="true"
      [validatorMin]="1"
      [validatorMax]="10"
      [validatorRequired]="true"
      [validatorEmail]="true"
      [validatorMinLength]="2"
      [validatorMaxLength]="2"
      validatorPattern="myRegex"
      validatorUpdateOn="submit"
    ></test-component>`,
  })
  class WrapperComponent {}


  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [NrfFormModule, NrfModelModule],
        declarations: [TestComponent, WrapperComponent],
      })
      .compileComponents();
  }));

  it('Should return a control-options filled', fakeAsync(() => {
    const fixture = TestBed.createComponent(WrapperComponent);

    fixture.detectChanges();

    const testEl: DebugElement = fixture.debugElement.query(By.directive(TestComponent));
    const testComponent: TestComponent = testEl.componentInstance;
    const { controlOptions } = testComponent;
    const validators = [
      Validators.min,
      Validators.max,
      Validators.required,
      Validators.email,
      Validators.minLength,
      Validators.maxLength,
      Validators.pattern,
    ];


    expect(controlOptions).toBeTruthy();
    expect(controlOptions.updateOn).toEqual('submit');
    expect(controlOptions.validators.length).toEqual(validators.length);
    expect((<any[]>controlOptions.validators).every(validator => validators.includes(validator)));
    expect(controlOptions.disabled).toBeTruthy();
  }));
});
