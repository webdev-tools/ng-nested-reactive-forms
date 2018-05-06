import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface NgRFSubmitData {
  rfForm: NgRFFormDirective;
  modelData: any;
  formGroup: FormGroup;
  event: Event;
}

/**
 * A component to abstract the form implementation
 *
 * It holds the validation and the submit logic
 *
 * @example
 * <form rfForm (rfSubmit)="aCallback($event)">
 *  // Inputs
 * </form>
 */
@Directive({
  selector: 'form[rfForm]',
})
export class NgRFFormDirective implements OnInit, OnDestroy {

  /**
   * Represents an Entity Model that comes from Database
   */
  @Input() rfModelData: any;

  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Output() rfSubmit = new EventEmitter<NgRFSubmitData>();

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

  ngOnDestroy() {
    this.rfSubmit.complete();
  }


  /**
   * # Should not be called directly!
   * This method wraps the form validation and call [onSubmit]{@link NgRFFormDirective#onSubmit}
   */
  @HostListener('submit', ['$event'])
  formSubmitWrapper($event: Event) {
    $event.preventDefault();

    if (!this.formGroup.valid) {
      return;
    }

    this.rfSubmit.emit({
      rfForm: this,
      modelData: this.rfModelData,
      formGroup: this.formGroup,
      event: $event,
    });
  }

}
