import { NgModule } from '@angular/core';

import { NrfNestedControlDirective } from './nested-control.directive';
import { NrfModelSetterService } from './model-setter.service';
import { NrfNestedFormService } from '../form/nested-form.service';

/**
 * Holds the nrfModel directive implementation
 */
@NgModule({
  imports: [
  ],
  providers: [
    NrfModelSetterService,
    NrfNestedFormService,
  ],
  declarations: [
    NrfNestedControlDirective,
  ],
  exports: [
    NrfNestedControlDirective,
  ],
})
export class NrfModelModule {

}
