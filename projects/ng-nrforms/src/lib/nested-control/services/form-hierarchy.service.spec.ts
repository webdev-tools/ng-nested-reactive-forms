import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { NrfFormHierarchyService } from './form-hierarchy.service';

describe('NrfFormHierarchyService', () => {
  const formHierarchy = new NrfFormHierarchyService();
  let rootFormGroup: FormGroup;

  beforeEach(() => {
    rootFormGroup = new FormGroup({});
  });

  it('Should create a nested control if not exists', () => {
    const child = formHierarchy.getNestedControl(rootFormGroup, 'test.child.desiredControl');

    expect(child instanceof FormGroup).toBeTruthy();
  });

  it('Should create a form-array control', () => {
    // Child in this case the first element of the Form Array
    const child = formHierarchy.getNestedControl(rootFormGroup, 'test.child.0');

    expect(child.parent instanceof FormArray).toBeTruthy();
  });

  it('Should return a parent if the full path points to a formControl', () => {
    const child = <FormGroup>formHierarchy.getNestedControl(rootFormGroup, 'test.0.child');
    const formControl = new FormControl();
    child.addControl('son', formControl);
    formControl.setValue('Son value');

    const child2 = <FormGroup>formHierarchy.getNestedControl(rootFormGroup, 'test.0.child.son');

    expect(child).toBe(child2);
    expect(rootFormGroup.value).toEqual({
      test: [
        {
          child: {
            son: 'Son value',
          },
        },
      ],
    });
  });
});
