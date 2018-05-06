import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRFFormComponent } from './form.component';
import { of as ObservableOf } from 'rxjs';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  template: `
    <rf-form [onSubmit]="handleSubmit()">
      <button type="submit"></button>
    </rf-form>
  `,
})
class TestComponent {

  handleSubmit = jasmine.createSpy('handleSubmit', () => ObservableOf(true));

}


describe('NgRFFormComponent', () => {
  let testComponent: TestComponent;
  let component: NgRFFormComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [TestComponent, NgRFFormComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.css('form'));
    component = formEl.componentInstance;
    submitEl = formEl.query(By.css('button'));

    fixture.detectChanges();
  });

  it('should render a form', () => {
    expect(component).toBeTruthy();
    component.formName = 'FormTest';

    fixture.detectChanges();

    expect(formEl.nativeElement.name).toEqual(component.formName);
  });

  it('should call the onSubmit handler', () => {
    submitEl.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(testComponent.handleSubmit).toHaveBeenCalled();
  });
});
