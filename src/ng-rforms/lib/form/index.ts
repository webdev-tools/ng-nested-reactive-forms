import { NgModule } from '@angular/core';

import { NgRFFormComponent } from './form.component';

/**
 * This module only handle form Abstraction and submit handler
 * No inputs are provided by this module.
 */
@NgModule({
  imports: [
  ],
  exports: [
    NgRFFormComponent,
  ],
  declarations: [
    NgRFFormComponent,
  ],
  providers: [
  ],
})
export class NgRFFormModule {

}
