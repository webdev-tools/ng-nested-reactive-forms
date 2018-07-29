import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NrfFormDirective } from '../form/form.directive';
import { NrfFormModule } from '../form/form.module';
import { NrfNestedControlContext } from './nested-control-context.class';
import { NrfNestedControlDirective } from './nested-control.directive';
import { NrfModelModule } from './nested-control.module';

let mockTestEntity = {};
let modelPath = 'testEntity.user.firstName';

/* tslint:disable component-selector ter-padded-blocks */
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
    <div *nrfNestedControl="modelPath; let control=formControl">
      <input [formControl]="control" />
    </div>
  `,
})
class TestInputComponent {
  modelPath: string;

  constructor() {
    this.modelPath = modelPath;
  }
}

describe('NrfNestedControlDirective', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formEl: DebugElement;
  let formComponent: NrfFormDirective;
  let inputEl: DebugElement;
  let context: NrfNestedControlContext;

  beforeEach(async(() => {
    mockTestEntity = {};
    modelPath = 'testEntity.user.firstName';

    TestBed.configureTestingModule({
      imports: [NrfFormModule, NrfModelModule],
      declarations: [TestComponent, TestInputComponent],
      providers: [],
    }).compileComponents();
  }));

  it(
    'Should set nrfEntity value on input changes',
    fakeAsync(() => {
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
    }),
  );

  it(
    'Should instantiate the input with the initial value on the nrfEntity',
    fakeAsync(() => {
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
    }),
  );

  it('should emit ready$ event', () => {
    const emitSpy = spyOn(NrfNestedControlDirective.prototype, 'emitReadyState');

    generateComponent();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should receive ready$ event even late', (done) => {
    generateComponent();

    context.nrfNestedControl.ready$.subscribe((value: boolean) => {
      expect(value).toBeTruthy();
      done();
    });

    fixture.detectChanges();
  });

  it(
    'Should work without model path and outside a form and nrfForm',
    fakeAsync(() => {
      modelPath = null;
      const testInputFixture = TestBed.createComponent<TestInputComponent>(TestInputComponent);
      testInputFixture.detectChanges();
      tick();

      inputEl = testInputFixture.debugElement.query(By.css('input'));
      const inputContext: NrfNestedControlContext = inputEl.context;

      expect(inputContext.formControl).toBeTruthy();
      expect(inputContext.formGroup).toBeFalsy();
      expect(inputContext.nrfNestedControl.modelPath).toBeFalsy();
    }),
  );

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
