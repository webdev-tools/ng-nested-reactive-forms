import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NrfFormContext } from './form-context.class';
import { NrfSubmitData } from './form-submit-data.class';
import { NrfFormDirective } from './form.directive';
import { NRF_FORM_SERVICE_PROVIDER, NrfFormService } from './form.service';

export { NrfFormDirective, NrfFormContext, NrfSubmitData, NrfFormService, NRF_FORM_SERVICE_PROVIDER };

/* tslint:disable: ter-padded-blocks */
/**
 * This module only handle form Abstraction and submit handler
 * No inputs are provided by this module.
 */
@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, NrfFormDirective],
  declarations: [NrfFormDirective],
})
export class NrfFormModule {}
