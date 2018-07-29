import { Input, OnInit } from '@angular/core';
import { AbstractControlOptions, Validators } from '@angular/forms';

/* tslint:disable: ter-padded-blocks */

export interface NrfControlOptions extends AbstractControlOptions {
  disabled: boolean;
}

// tslint:disable no-input-rename

/**
 * Input wrappers components should extends this class to pass constraints downwards
 */
export abstract class NrfControlOptionsComponent implements OnInit {
  /**
   * A list of Validators to validate the input and the update-on strategy
   */
  controlOptions: NrfControlOptions;

  /**
   * Sets this input to readonly and block any changes
   */
  @Input('disabled') disabled: boolean = null;

  /**
   * Define the lowest number value that this input should accept
   */
  @Input('min') min: string | number = null;

  /**
   * Define the maximum number value that this input should accept
   */
  @Input('max') max: string | number = null;

  /**
   * Set this input as required and fails when empty
   */
  @Input('required') required: boolean = null;

  // @Input('RequiredTrue') requiredTrue: string = null;

  /**
   * Set this input as an e-mail and validates the e-mail patter
   */
  @Input('email') email: boolean = null;

  /**
   * Define the minimum characters quantity this input should accept
   */
  @Input('minLength') minLength: string | number = null;

  /**
   * Define the maximum characters quantity this input should accept
   */
  @Input('maxLength') maxLength: string | number = null;

  /**
   * Set a Regular Expression to match the input value against and fails if not match
   */
  @Input('pattern') pattern: string | RegExp = null;

  /**
   * The event name for control to update upon.
   */
  @Input('updateOn') updateOn: 'change' | 'blur' | 'submit' = null;

  /**
   * Cache the validators to enhance the performance
   */
  ngOnInit() {
    this.controlOptions = this.generateControlOptions();
  }

  /**
   * Generate the control options based on the properties set in this component
   */
  generateControlOptions(): NrfControlOptions {
    return {
      validators: Object.keys(Validators)
        .filter((key) => this[key])
        .map((key) => Validators[key]),
      updateOn: this.updateOn,
      disabled: this.disabled,
    };
  }
}
