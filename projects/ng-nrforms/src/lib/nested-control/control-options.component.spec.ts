import { Component, DebugElement } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NrfFormModule } from '../form/form.module';
import { NrfControlOptionsComponent } from './control-options.component';
import { NrfModelModule } from './nested-control.module';

/* tslint:disable component-selector */

describe('control-options.component', () => {
  @Component({
    selector: 'test-component',
    template: ``,
  })
  class TestComponent extends NrfControlOptionsComponent {}

  @Component({
    template: `<test-component
      [disabled]="true"
      [min]="1"
      [max]="10"
      [required]="true"
      [email]="true"
      [minLength]="2"
      [maxLength]="2"
      pattern="myRegex"
      updateOn="submit"
    ></test-component>`,
  })
  class WrapperComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NrfFormModule, NrfModelModule],
      declarations: [TestComponent, WrapperComponent],
    }).compileComponents();
  }));

  it(
    'Should return a control-options filled',
    fakeAsync(() => {
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
      expect((<any[]>controlOptions.validators).every((validator) => validators.includes(validator)));
      expect(controlOptions.disabled).toBeTruthy();
    }),
  );
});
