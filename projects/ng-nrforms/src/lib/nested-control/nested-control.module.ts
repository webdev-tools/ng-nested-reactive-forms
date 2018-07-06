import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NrfControlOptionsComponent } from './control-options.component';
import { NrfModelSetterService } from './model-setter.service';
import { NrfNestedControlContext } from './nested-control-context.class';
import { NrfNestedControlDirective } from './nested-control.directive';


export {
  NrfNestedControlDirective,
  NrfNestedControlContext,
  NrfModelSetterService,
  NrfControlOptionsComponent,
};


/**
 * Holds the nrfModel directive implementation
 */
@NgModule({
  imports:[
    CommonModule,
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
export class NrfModelModule {}
