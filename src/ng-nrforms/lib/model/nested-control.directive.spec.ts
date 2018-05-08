import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NrfNestedControlContext, NrfNestedControlDirective } from './nested-control.directive';
import { NrfFormModule } from '../form';
import { NrfModelModule } from './index';


let mockTestEntity = {};

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
    expect(testEntity && testEntity.user && testEntity.user.firstName).toBeFalsy();

    const input: HTMLInputElement = inputEl.nativeElement;
    input.value = name;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testEntity && testEntity.user && testEntity.user.firstName).toEqual(name);
    expect(input.value).toEqual(name);
  }));

  it('Should instantiate the input with the initial value on the nrfEntity', fakeAsync(() => {
    mockTestEntity = {
      user: {
        firstName: 'Jane',
      },
    };

    generateComponent();
    tick();

    expect(context.formControl.value).toEqual(testComponent.testEntity.user.firstName);
    expect(inputEl.nativeElement.value).toEqual(testComponent.testEntity.user.firstName);
  }));

  function generateComponent() {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
    context = inputEl.context;
  }
});
