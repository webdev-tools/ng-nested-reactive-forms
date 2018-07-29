import { Component, Input } from '@angular/core';

import { NrfControlOptionsComponent } from '@webdev-tools/ng-nested-reactive-forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: 'custom-input.component.html',
})
export class CustomInputComponent extends NrfControlOptionsComponent {
  @Input() modelName: string;
  @Input() placeholder: string;
}
