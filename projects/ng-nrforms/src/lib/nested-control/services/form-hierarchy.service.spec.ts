import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NrfFormDirective, NrfFormModule } from '../../form/form.module';
import { NrfModelModule } from '../nested-control.module';
import { NrfFormHierarchyService } from './form-hierarchy.service';

/* tslint:disable component-selector max-classes-per-file */

describe('NrfFormHierarchyService', () => {
  const formHierarchy = new NrfFormHierarchyService();
  let rootFormGroup: FormGroup;

  beforeEach(() => {
    rootFormGroup = new FormGroup({});
  });

  it('Should create a nested control if not exists', () => {
    const child = formHierarchy.getNestedControl(rootFormGroup, 'test.child.desiredControl');

    expect(child instanceof FormGroup).toBeTruthy();
  });

  it('Should create a form-array control', () => {
    // Child in this case the first element of the Form Array
    const child = formHierarchy.getNestedControl(rootFormGroup, 'test.child.0');

    expect(child instanceof FormArray).toBeTruthy();
  });

  it('Should return a parent if the full path points to a formControl', () => {
    const child = <FormGroup>formHierarchy.getNestedControl(rootFormGroup, 'test.0.son');
    const formControl = new FormControl();
    child.addControl('son', formControl);
    formControl.setValue('Son value');

    const child2 = <FormGroup>formHierarchy.getNestedControl(rootFormGroup, 'test.0.son');

    expect(child).toBe(child2);
    expect(rootFormGroup.value).toEqual({
      test: [
        {
          son: 'Son value',
        },
      ],
    });
  });

  describe('Use inputs with formControlName', () => {
    let modelPath: string;

    @Component({
      selector: 'test-input',
      template: `
        <form nrfForm [nrfEntity]="testEntity">
          <div
            *nrfNestedControl="modelPath; let control = formControl; let nrfNestedControl = nrfNestedControl"
            [formGroup]="control.parent"
          >
            <input [formControlName]="nrfNestedControl.controlName" />
          </div>
        </form>
      `,
    })
    class TestInputComponent {
      modelPath: string;
      testEntity: any = {};

      constructor() {
        this.modelPath = modelPath;
      }
    }

    let fixture: ComponentFixture<TestInputComponent>;
    let inputEl: DebugElement;
    let formEl: DebugElement;
    let nrfForm: NrfFormDirective;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NrfFormModule, NrfModelModule],
        declarations: [TestInputComponent],
      }).compileComponents();
    }));

    it(
      'Should set value on correct place when using formControlName',
      fakeAsync(() => {
        modelPath = 'testEntity.first';
        generateComponent();

        const name = 'Jane';
        const input: HTMLInputElement = inputEl.nativeElement;

        input.value = name;
        inputEl.triggerEventHandler('input', { target: input });

        tick();

        const formData = nrfForm.formData;
        expect(formData.first).toEqual(name);
      }),
    );

    it(
      'Should set value on correct place when using formControlName on form-array',
      fakeAsync(() => {
        modelPath = 'testEntity.second.0';
        generateComponent();

        const name = 'John';
        const input: HTMLInputElement = inputEl.nativeElement;

        input.value = name;
        inputEl.triggerEventHandler('input', { target: input });

        tick();

        const formData = nrfForm.formData;
        expect(formData.second[0]).toEqual(name);
      }),
    );

    function generateComponent() {
      fixture = TestBed.createComponent(TestInputComponent);

      fixture.detectChanges();

      inputEl = fixture.debugElement.query(By.css('input'));
      formEl = fixture.debugElement.query(By.css('form'));
      nrfForm = formEl.context.nrfForm || formEl.injector.get(NrfFormDirective);

      tick();
    }
  });
});
