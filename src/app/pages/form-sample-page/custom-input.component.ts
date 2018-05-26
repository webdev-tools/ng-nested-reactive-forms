import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: 'custom-input.component.html',
})

export class CustomInputComponent {

  @Input() modelName: string;
  @Input() placeholder: string;

}
