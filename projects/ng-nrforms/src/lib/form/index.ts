import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NrfFormDirective } from './form.directive';

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
