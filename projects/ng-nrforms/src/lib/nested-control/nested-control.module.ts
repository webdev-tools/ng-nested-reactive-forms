import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NrfControlOptionsComponent } from './control-options.component';
import { NrfNestedControlContext } from './nested-control-context.class';
import { NrfNestedControlDirective } from './nested-control.directive';
import { NrfFormHierarchyService } from './services/form-hierarchy.service';
import { NrfModelSetterService } from './services/model-setter.service';


export {
  NrfNestedControlDirective,
  NrfNestedControlContext,
  NrfModelSetterService,
  NrfControlOptionsComponent,
  NrfFormHierarchyService,
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
    NrfFormHierarchyService,
  ],
  declarations: [
    NrfNestedControlDirective,
  ],
  exports: [
    NrfNestedControlDirective,
  ],
})
export class NrfModelModule {}
