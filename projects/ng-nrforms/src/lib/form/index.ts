import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NrfFormDirective } from './form.directive';
import { NrfFormContext } from './form-context.class';
import { NrfSubmitData } from './form-submit-data.class';

export {
  NrfFormDirective,
  NrfFormContext,
  NrfSubmitData,
};

/**
 * This module only handle form Abstraction and submit handler
 * No inputs are provided by this module.
 */
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NrfFormDirective,
  ],
  declarations: [
    NrfFormDirective,
  ],
})
export class NrfFormModule {

}
