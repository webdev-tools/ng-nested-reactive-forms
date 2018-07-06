import { NgModule } from '@angular/core';

import { NrfFormModule } from './form/form.module';
import { NrfModelModule } from './nested-control/nested-control.module';

export * from './utils/clone-deep';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ],
})
export class NrFormsModule { }
