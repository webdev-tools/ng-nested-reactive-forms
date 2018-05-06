import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRformsComponent } from './ng-rforms.component';

describe('NgRformsComponent', () => {
  let component: NgRformsComponent;
  let fixture: ComponentFixture<NgRformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
