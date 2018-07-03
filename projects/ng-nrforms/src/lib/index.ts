import { NgModule } from '@angular/core';

import { NrfFormModule } from './form/index';
import { NrfModelModule } from './nested-control/index';

export * from './utils/clone-deep';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ],
})
export class NrFormsModule { }
