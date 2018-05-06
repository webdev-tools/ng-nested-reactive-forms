import { Component } from '@angular/core';

@Component({
  selector: 'app-form-sample-page',
  templateUrl: 'form-sample-page.component.html',
})

export class FormSamplePageComponent {
  testEntity = {};

  handleSubmit(...args: any[]) {
    console.log('submitted', args);
  }
}
