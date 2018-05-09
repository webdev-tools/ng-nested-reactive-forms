import { NgModule } from '@angular/core';

import { NrfFormModule } from './form/index';
import { NrfModelModule } from './nested-control/index';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ]
})
export class NrFormsModule { }
