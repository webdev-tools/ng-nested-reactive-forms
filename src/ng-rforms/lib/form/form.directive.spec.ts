import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NgRFFormDirective } from './form.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  template: `
    <form rfForm (rfSubmit)="handleSubmit()">
      <button type="submit">Submit</button>
    </form>
  `,
})
class TestComponent {

  handleSubmit = jasmine.createSpy('handleSubmit');

}


describe('NgRFFormDirective', () => {
  let testComponent: TestComponent;
  let component: NgRFFormDirective;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [TestComponent, NgRFFormDirective],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.css('form'));
    component = formEl.injector.get(NgRFFormDirective);
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
