import { NgModule } from '@angular/core';

import { NrfNestedControlDirective } from './nested-control.directive';
import { NrfModelSetterService } from './model-setter.service';

/**
 * Holds the nrfModel directive implementation
 */
@NgModule({
  imports: [
  ],
  providers: [
    NrfModelSetterService,
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
