import { Component, ViewChild } from '@angular/core';
import { NrfFormDirective, NrfSubmitData } from '@webdev-tools/ng-nested-reactive-forms';

@Component({
  selector: 'app-form-sample-page',
  templateUrl: 'form-sample-page.component.html',
})

export class FormSamplePageComponent {
  testEntity = {
    address: 'Carnaby Street'
  };

  @ViewChild(NrfFormDirective) nrfForm;

  handleSubmit($event: NrfSubmitData) {
    console.log('submitted', $event);
  }
}
