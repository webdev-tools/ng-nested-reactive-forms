import { TestBed, inject } from '@angular/core/testing';

import { NgRformsService } from './ng-rforms.service';

describe('NgRformsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRformsService]
    });
  });

  it('should be created', inject([NgRformsService], (service: NgRformsService) => {
    expect(service).toBeTruthy();
  }));
});
