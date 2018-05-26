import { NgModule } from '@angular/core';

import { NrfFormModule } from './form/index';
import { NrfModelModule } from './nested-control/index';
import { NrfNestedFormService } from './form/nested-form.service';

@NgModule({
  exports: [
    NrfFormModule,
    NrfModelModule,
  ],
  providers: [
    NrfNestedFormService,
  ]
})
export class NrFormsModule { }
