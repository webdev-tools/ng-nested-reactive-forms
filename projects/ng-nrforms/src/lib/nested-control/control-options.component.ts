import { Input, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControlOptions } from '@angular/forms';

/**
 * Input wrappers components should extends this class to pass constraints downwards
 */
export abstract class NrfControlOptionsComponent implements OnInit {
  // tslint:disable no-input-rename

  /**
   * A list of Validators to validate the input and the update-on strategy
   */
  controlOptions: AbstractControlOptions;

  /**
   * Sets this input to readonly and block any changes
   */
  @Input('validatorReadonly') readonly: boolean = null;

  /**
   * Sets this input to readonly and block any changes
   */
  @Input('validatorDisabled') disabled: boolean = null;

  /**
   * Define the lowest number value that this input should accept
   */
  @Input('validatorMin') min: string | number = null;

  /**
   * Define the maximum number value that this input should accept
   */
  @Input('validatorMax') max: string | number = null;

  /**
   * Set this input as required and fails when empty
   */
  @Input('validatorRequired') required: boolean = null;

  // @Input('validatorRequiredTrue') requiredTrue: string = null;

  /**
   * Set this input as an e-mail and validates the e-mail patter
   */
  @Input('validatorEmail') email: boolean = null;

  /**
   * Define the minimum characters quantity this input should accept
   */
  @Input('validatorMinLength') minLength: string | number = null;

  /**
   * Define the maximum characters quantity this input should accept
   */
  @Input('validatorMaxLength') maxLength: string | number = null;

  /**
   * Set a Regular Expression to match the input value against and fails if not match
   */
  @Input('validatorPattern') pattern: string | RegExp = null;

  /**
   * The event name for control to update upon.
   */
  @Input('validatorUpdateOn') updateOn: 'change' | 'blur' | 'submit' = null;


  /**
   * Cache the validators to enhance the performance
   */
  ngOnInit() {
    this.controlOptions = this.generateControlOptions();
  }

  /**
   * Generate the control options based on the properties set in this component
   */
  generateControlOptions(): AbstractControlOptions {
    return {
      validators: Object.keys(Validators).filter(key => this[key]).map(key => Validators[key]),
      updateOn: this.updateOn,
    };
  }

}
