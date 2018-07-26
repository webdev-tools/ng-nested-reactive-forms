import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable()
/**
 * Controls the Hierarchy of FormGroups and FormArrays
 */
export class NrfFormHierarchyService {

  /**
   * Get a nested control if it exists or create the its necessary hierarchy
   *
   * @param rootFormGroup
   * @param fullPath Dot notation path of the desired control, without the last part, that is the value, not the control.
   */
  getNestedControl(rootFormGroup: FormGroup | FormArray, fullPath: string) {
    let parentControl = <FormGroup | FormArray>rootFormGroup.get(fullPath);

    if (!parentControl) {
      parentControl = fullPath.split('.').reduce<FormGroup | FormArray>(this.createFormGroupHierarchy, rootFormGroup);
    }

    if (parentControl instanceof FormControl) {
      parentControl = parentControl.parent;
    }

    return parentControl;
  }

  /**
   * Iterate over all path pieces creating the needed controls if they do not exists.
   */
  private createFormGroupHierarchy(
    parentControl: FormGroup | FormArray,
    path: string,
    index: number,
    pathPieces: string[],
  ): FormGroup | FormArray {
    let control = <FormGroup | FormArray>parentControl.get(path);

    if (!control) {
      const nextPath = pathPieces[index + 1];
      const isArray = nextPath && !isNaN(<any>nextPath);
      control = isArray ? new FormArray([]) : new FormGroup({});
    }

    if (parentControl instanceof FormGroup) {
      parentControl.addControl(path, control);
    } else {
      parentControl.insert(parseInt(path, 10), control);
    }

    return control;
  }

}
