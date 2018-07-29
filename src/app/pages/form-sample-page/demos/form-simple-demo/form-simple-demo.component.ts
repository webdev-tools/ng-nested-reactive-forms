/* tslint:disable: component-selector */
import { Component, ViewChild } from '@angular/core';

import { NrfFormDirective, NrfSubmitData } from '@webdev-tools/ng-nested-reactive-forms';

@Component({
  selector: 'form-simple-demo',
  templateUrl: './form-simple-demo.component.html',
})
export class FormSimpleDemoComponent {
  testEntity = {
    address: 'Carnaby Street',
  };

  @ViewChild(NrfFormDirective) nrfForm;

  handleSubmit($event: NrfSubmitData) {
    console.log('submitted', $event);
  }
}
