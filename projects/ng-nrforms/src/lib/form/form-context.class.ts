import { FormGroup } from '@angular/forms';
import { NrfFormDirective } from './form.directive';

export class NrfFormContext {

  $implicit: NrfFormDirective;
  formGroup: FormGroup;

  constructor(
    public nrfForm: NrfFormDirective,
  ) {
    this.$implicit = nrfForm;
    this.formGroup = nrfForm.formGroup;
  }

}
