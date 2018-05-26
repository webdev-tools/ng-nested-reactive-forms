import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NrFormsModule } from '..';
import { NrfNestedFormService } from './nested-form.service';

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
  providers: [
    { provide: NrfNestedFormService, useClass: NrfNestedFormService },
  ],
})
class StructuralComponent {

  handleSubmit = jasmine.createSpy('handleSubmit');

}


describe('NrfFormDirective', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let submitEl: DebugElement;
  let nestedFormService: NrfNestedFormService;

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
    nestedFormService = formEl.injector.get(NrfNestedFormService);

    fixture.detectChanges();
    tick();
  }

  it('should call the onSubmit handler', fakeAsync(() => {
    createComponent();
    submitEl.nativeElement.click();

    fixture.detectChanges();
    tick();

    expect(testComponent.handleSubmit).toHaveBeenCalled();
  }));


  it('should accept structural definition', fakeAsync(() => {
    createComponent(StructuralComponent);

    nestedFormService.submit$.subscribe(testComponent.handleSubmit);

    submitEl.nativeElement.click();

    fixture.detectChanges();
    tick();

    expect(testComponent.handleSubmit).toHaveBeenCalled();
  }));
});
