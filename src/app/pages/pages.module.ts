import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { NrFormsModule } from '@webdev-tools/ng-nested-reactive-forms';

import { CodeHighlightService } from '../doc-block/code-block/code-highlight.service';
import { DocBlockModule } from '../doc-block/doc-block.module';
import { CustomInputComponent } from './form-sample-page/demos/form-simple-demo/custom-input.component';
import { FormSimpleDemoComponent } from './form-sample-page/demos/form-simple-demo/form-simple-demo.component';
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
    DocBlockModule,
  ],
  declarations: [FormSamplePageComponent, CustomInputComponent, FormSimpleDemoComponent],
  providers: [CodeHighlightService],
})
export class SamplesPagesModule {}
