import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NrFormsModule } from '..';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <form nrfForm (nrfSubmit)="handleSubmit()">
      <button type="submit">Submit</button>
    </form>
  `,
})
class TestComponent {

  handleSubmit = jasmine.createSpy('handleSubmit');

}

@Component({
  template: `
    <form *nrfForm>
      <button type="submit">Submit</button>
    </form>
  `,
})
class StructuralComponent {

  handleSubmit = jasmine.createSpy('handleSubmit');

}


describe('NrfFormDirective', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          NrFormsModule,
        ],
        declarations: [TestComponent, StructuralComponent],
      })
      .compileComponents();
  }));

  function createComponent(componentToCreate = TestComponent) {
    fixture = TestBed.createComponent(componentToCreate);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();
    tick();

    formEl = fixture.debugElement.query(By.css('form'));
    submitEl = formEl.query(By.css('button'));

    fixture.detectChanges();
    tick();
  }

  // it('should start with an empty formGroup', () => {
  //   const formGroup: FormGroup = testComponent.formGroup;
  //   expect(Object.keys(formGroup.controls).length).toEqual(0);
  //   expect(formGroup.valid).toBeTruthy();
  //   expect(formGroup.touched).toBeFalsy();
  // });
  //
  // it('should set formData with cloned entity properties', () => {
  //   const entity = {
  //     name: 'John',
  //   };
  //
  //   nestedFormService.entity = entity;
  //
  //   expect(nestedFormService.formData.name).toEqual(entity.name);
  // });

  it('should call the onSubmit handler', fakeAsync(() => {
    createComponent();
    submitEl.nativeElement.click();

    fixture.detectChanges();
    tick();

    expect(testComponent.handleSubmit).toHaveBeenCalled();
  }));


  // it('should accept structural definition', fakeAsync(() => {
  //   createComponent(StructuralComponent);
  //
  //   nestedFormService.submit$.subscribe(testComponent.handleSubmit);
  //
  //   submitEl.nativeElement.click();
  //
  //   fixture.detectChanges();
  //   tick();
  //
  //   expect(testComponent.handleSubmit).toHaveBeenCalled();
  // }));
});
