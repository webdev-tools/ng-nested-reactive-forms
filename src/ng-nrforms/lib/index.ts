import { NgModule } from '@angular/core';

import { NrfFormModule } from './form';
import { NrfModelModule } from './nested-control';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ]
})
export class NrFormsModule { }
