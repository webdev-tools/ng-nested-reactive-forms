import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { NrFormsModule } from '@webdev-tools/ng-nested-reactive-forms';

import { FormSamplePageComponent } from './form-sample-page/form-sample-page.component';
import { CustomInputComponent } from './form-sample-page/custom-input.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    NrFormsModule,
  ],
  declarations: [
    FormSamplePageComponent,
    CustomInputComponent,
  ],
})
export class SamplesPagesModule {

}
