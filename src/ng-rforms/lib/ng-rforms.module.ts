import { NgModule } from '@angular/core';

import { NgRFFormModule } from './form';
import { NgRFModelModule } from './model';

@NgModule({
  exports: [
    NgRFFormModule,
    NgRFModelModule,
  ]
})
export class NgRFormsModule { }
