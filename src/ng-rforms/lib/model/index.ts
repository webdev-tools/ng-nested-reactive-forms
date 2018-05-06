import { NgModule } from '@angular/core';

import { NgRFModelDirective } from './model.directive';
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
    NgRFModelDirective,
  ],
  exports: [
    NgRFModelDirective,
  ],
})
export class NgRFModelModule {

}
