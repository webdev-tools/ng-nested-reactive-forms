import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule, MatTabsModule } from '@angular/material';

import 'prismjs';
import 'prismjs/components/prism-typescript';

import { CodeBlockComponent } from './code-block/code-block.component';
import { DocBlockComponent } from './doc-block.component';

@NgModule({
  imports: [CommonModule, MatTabsModule, MatBadgeModule],
  declarations: [DocBlockComponent, CodeBlockComponent],
  exports: [DocBlockComponent, CodeBlockComponent],
})
export class DocBlockModule {}
