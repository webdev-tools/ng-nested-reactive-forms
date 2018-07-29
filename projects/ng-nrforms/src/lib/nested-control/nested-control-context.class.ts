import { FormControl, FormGroup } from '@angular/forms';

import { NrfNestedControlDirective } from './nested-control.directive';

export class NrfNestedControlContext {
  $implicit: FormControl;

  constructor(
    public formControl: FormControl,
    public formGroup: FormGroup,
    public nrfNestedControl: NrfNestedControlDirective,
  ) {
    this.$implicit = formControl;
  }
}
