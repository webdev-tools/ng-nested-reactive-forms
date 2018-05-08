import { NgModule } from '@angular/core';

import { NrfFormModule } from './form';
import { NrfModelModule } from './model';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ]
})
export class NrFormsModule { }
