import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgRFModelDirective } from './model.directive';
import { NgRFFormModule } from '../form';
import { NgRFModelModule } from './index';


let mockTestEntity = {};

@Component({
  template: `
    <form rfForm [rfModelData]="testEntity">
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
    <input rfModel="testEntity.user.firstName" />
  `,
})
class TestInputComponent {

}


describe('NgRFModelDirective', () => {
  let testComponent: TestComponent;
  let modelEl: DebugElement;
  let modelDirective: NgRFModelDirective;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [NgRFFormModule, NgRFModelModule],
        declarations: [TestComponent, TestInputComponent],
        providers: [],
      })
      .compileComponents();
  }));

  it('Should set rfModelData value on input changes', fakeAsync(() => {
    generateComponent();
    const name = 'John';
    const testEntity: any = testComponent.testEntity;
    expect(testEntity && testEntity.user && testEntity.user.firstName).toBeFalsy();

    const input: HTMLInputElement = inputEl.nativeElement;
    input.value = name;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testEntity && testEntity.user && testEntity.user.firstName).toEqual(name);
    expect(input.value).toEqual(name);
  }));

  it('Should instantiate the input with the initial value on the rfModelData', fakeAsync(() => {
    mockTestEntity = {
      user: {
        firstName: 'Jane',
      },
    };

    generateComponent();
    tick();

    expect(modelDirective.formControl.value).toEqual(testComponent.testEntity.user.firstName);
    expect(inputEl.nativeElement.value).toEqual(testComponent.testEntity.user.firstName);
  }));

  function generateComponent() {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    modelEl = fixture.debugElement.query(By.directive(NgRFModelDirective));
    modelDirective = modelEl.injector.get(NgRFModelDirective);
    inputEl = fixture.debugElement.query(By.css('input'));

    fixture.detectChanges();
  }
});
