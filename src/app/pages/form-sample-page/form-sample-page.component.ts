import { Component } from '@angular/core';

const DEMO_SNIPPETS = {
  basic: {
    code: require('!!raw-loader!./demos/form-simple-demo/form-simple-demo.component.ts'),
    markup: require('!!raw-loader!./demos/form-simple-demo/form-simple-demo.component.html'),
    others: [
      {
        content: require('!!raw-loader!./demos/form-simple-demo/custom-input.component.html'),
        type: 'C',
        name: 'custom-input.component.html',
        lang: 'html',
      },
      {
        content: require('!!raw-loader!./demos/form-simple-demo/custom-input.component.ts'),
        type: 'T',
        name: 'custom-input.component.ts',
        lang: 'typescript',
      },
    ],
  },
};

@Component({
  selector: 'app-form-sample-page',
  templateUrl: 'form-sample-page.component.html',
})
export class FormSamplePageComponent {
  snippets = DEMO_SNIPPETS;
}
