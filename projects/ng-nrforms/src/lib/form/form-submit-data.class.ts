import { FormGroup } from '@angular/forms';

import { NrfFormDirective } from './form.directive';

export class NrfSubmitData {
  nrfForm: NrfFormDirective;
  formData: any;
  entity: any;
  formGroup: FormGroup;
  event: Event;

  constructor(nrfForm: NrfFormDirective, $event: Event) {
    this.nrfForm = nrfForm;
    this.event = $event;
    this.formData = nrfForm.formData;
    this.entity = nrfForm.nrfEntity;
    this.formGroup = nrfForm.formGroup;
  }
}
