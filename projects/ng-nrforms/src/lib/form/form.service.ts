import { EventEmitter, Injectable, Provider } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { cloneDeep } from '../utils/clone-deep';
import { NrfSubmitData } from './form-submit-data.class';


@Injectable()
export class NrfFormService {

  /**
   * Form group will hold all inputs within this form.
   *
   * Every input should register itself to this form group.
   *
   * The data in this form group will not be sent to backend, just form validations and input management.
   */
  readonly formGroup: FormGroup = new FormGroup({});

  // tslint:disable-next-line:variable-name
  private privateEntity: any;

  set entity(entity: any) {
    this.privateEntity = entity;
    this.formData = cloneDeep(entity); // TODO merge with existent formData
  }
  get entity() {
    return this.privateEntity;
  }

  /**
   * Represents the data inputted by the user on the fields
   */
  formData: any;

  /**
   * Internal emitter to handle form submit
   */
  readonly submit$ = new EventEmitter<NrfSubmitData>();

}

export const NRF_FORM_SERVICE_PROVIDER: Provider = {
  provide: NrfFormService,
  useFactory: () => (new NrfFormService()),
};
