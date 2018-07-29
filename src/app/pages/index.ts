import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { NrFormsModule } from '@webdev-tools/ng-nested-reactive-forms';

import { CustomInputComponent } from './form-sample-page/custom-input.component';
import { FormSamplePageComponent } from './form-sample-page/form-sample-page.component';

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
  declarations: [FormSamplePageComponent, CustomInputComponent],
})
export class SamplesPagesModule {}
