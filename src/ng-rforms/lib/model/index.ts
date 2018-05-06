import { NgModule } from '@angular/core';

import { NgRFNestedControlDirective } from './nested-control.directive';
import { NgRFModelSetterService } from './model-setter.service';

/**
 * Holds the rfModel directive implementation
 */
@NgModule({
  imports: [
  ],
  providers: [
    NgRFModelSetterService,
  ],
  declarations: [
    NgRFNestedControlDirective,
  ],
  exports: [
    NgRFNestedControlDirective,
  ],
})
export class NgRFModelModule {

}
