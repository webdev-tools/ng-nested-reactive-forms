import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NrfNestedControlContext, NrfNestedControlDirective } from './nested-control.directive';
import { NrfFormModule } from '../form';
import { NrfFormDirective } from '../form/form.directive';
import { NrfModelModule } from './index';


let mockTestEntity = {};
/* tslint:disable component-selector */
@Component({
  template: `
    <form nrfForm [nrfEntity]="testEntity">
      <test-input></test-input>
    </form>
  `,
})
class TestComponent {

  testEntity: any;

  constructor() {
    this.testEntity = mockTestEntity;
  }

}

@Component({
  selector: 'test-input',
  template: `
    <div *nrfNestedControl="'testEntity.user.firstName'; let control=formControl">
      <input [formControl]="control" />
    </div>
  `,
})
class TestInputComponent {

}


describe('NrfNestedControlDirective', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let formComponent: NrfFormDirective;
  let inputEl: DebugElement;
  let context: NrfNestedControlContext;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [NrfFormModule, NrfModelModule],
        declarations: [TestComponent, TestInputComponent],
        providers: [],
      })
      .compileComponents();
  }));

  it('Should set nrfEntity value on input changes', fakeAsync(() => {
    generateComponent();
    const name = 'John';
    const testEntity: any = testComponent.testEntity;
    const formData = formComponent.formData;

    expect(testEntity && testEntity.user && testEntity.user.firstName).toBeFalsy();

    const input: HTMLInputElement = inputEl.nativeElement;
    input.value = name;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testEntity && testEntity.user && testEntity.user.firstName).toBeFalsy();
    expect(formData.user.firstName).toEqual(name);
    expect(input.value).toEqual(name);
  }));

  it('Should instantiate the input with the initial value on the nrfEntity', fakeAsync(() => {
    const firstName = 'Jane';

    mockTestEntity = {
      user: {
        firstName,
      },
    };

    generateComponent();
    tick();

    expect(context.formControl.value).toEqual(firstName);
    expect(inputEl.nativeElement.value).toEqual(firstName);
    expect(formComponent.formData.user.firstName).toEqual(firstName);
  }));

  it('should emit ready$ event', () => {
    const emitSpy = spyOn(NrfNestedControlDirective.prototype, 'emitReadyState');

    generateComponent();

    expect(emitSpy).toHaveBeenCalled();
  });

  function generateComponent() {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();

    formEl = fixture.debugElement.query(By.css('form'));
    formComponent = formEl.injector.get(NrfFormDirective);

    inputEl = fixture.debugElement.query(By.css('input'));
    context = inputEl.context;
  }
});
