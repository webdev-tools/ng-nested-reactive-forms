import { NgModule } from '@angular/core';

import { NrfNestedControlDirective } from './nested-control.directive';
import { NrfModelSetterService } from './model-setter.service';
import { NrfControlOptionsComponent } from './control-options.component';


export {
  NrfNestedControlDirective,
  NrfModelSetterService,
  NrfControlOptionsComponent,
};


/**
 * Holds the nrfModel directive implementation
 */
@NgModule({
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
export class NrfModelModule {}
