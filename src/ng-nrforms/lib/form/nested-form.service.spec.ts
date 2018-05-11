import { NrfNestedFormService } from './nested-form.service';
import { FormGroup } from '@angular/forms';

describe('NrfNestedFormService', () => {
  let nestedFormService: NrfNestedFormService;

  beforeEach(() => {
    nestedFormService = new NrfNestedFormService();
  });

  it('should start with an empty formGroup', () => {
    const formGroup: FormGroup = nestedFormService.formGroup;
    expect(Object.keys(formGroup.controls).length).toEqual(0);
    expect(formGroup.valid).toBeTruthy();
    expect(formGroup.touched).toBeFalsy();
  });

  it('should set formData with cloned entity properties', () => {
    const entity = {
      name: 'John',
    };

    nestedFormService.entity = entity;

    expect(nestedFormService.formData.name).toEqual(entity.name);
  });
});
