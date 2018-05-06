import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * A component to abstract the form implementation
 *
 * It holds the validation and the submit logic
 *
 * @example
 * <rf-form formName="UsersForm" [onSubmit]="aFunctionWithoutParen">
 *  // Inputs
 * </rf-form>
 */
@Component({
  selector: 'rf-form',
  templateUrl: './form.component.html',
})
export class NgRFFormComponent implements OnInit {

  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Input() onSubmit: (data: any) => Observable<any>;

  /**
   * The name that will be placed on the form property [name]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/name}
   */
  @Input() formName: string;

  /**
   * The form instance rendered inside this template
   */
  @ViewChild(NgForm) private form: NgForm;

  /**
   * Represents an Entity Model that comes from Database
   */
  @Input() rfModelData: any;

  /**
   * Form group will hold all inputs within this form.
   *
   * Every input should register itself to this form group.
   *
   * The data in this form group will not be sent to backend, just form validations and input management.
   */
  formGroup: FormGroup;


  /**
   * @ignore
   */
  constructor() {
    this.formGroup = new FormGroup({});
  }


  /**
   * Init an empty rfModelData, in case none where provided.
   */
  ngOnInit() {
    if (!this.rfModelData) {
      this.rfModelData = {};
    }
  }


  /**
   * # Should not be called directly!
   * This method wraps the form validation and call [onSubmit]{@link NgRFFormComponent#onSubmit}
   */
  formSubmitWrapper() {
    if (!this.onSubmit) {
      console.warn('No onSubmit provided');
      return;
    }

    const submitResult = this.onSubmit({});
    submitResult.subscribe();
  }

}
