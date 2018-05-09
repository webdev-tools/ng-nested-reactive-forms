import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NrfFormDirective } from './form.directive';
import { NrfNestedFormService } from './nested-form.service';

class OverrideNrfNestedFormService extends NrfNestedFormService {}

@Component({
  template: `
    <form nrfForm (nrfSubmit)="handleSubmit()">
      <button type="submit">Submit</button>
    </form>
  `,
  providers: [
    { provide: NrfNestedFormService, useClass: OverrideNrfNestedFormService },
  ],
})
class TestComponent {

  handleSubmit = jasmine.createSpy('handleSubmit');

}


describe('NrfFormDirective', () => {
  let testComponent: TestComponent;
  let component: NrfFormDirective;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [TestComponent, NrfFormDirective],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.css('form'));
    component = formEl.injector.get(NrfFormDirective);
    submitEl = formEl.query(By.css('button'));

    fixture.detectChanges();
  });

  it('should render a form', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit handler', fakeAsync(() => {
    // submitEl.triggerEventHandler('click', null);
    submitEl.nativeElement.click();

    fixture.detectChanges();
    tick();

    expect(testComponent.handleSubmit).toHaveBeenCalled();
  }));
});
