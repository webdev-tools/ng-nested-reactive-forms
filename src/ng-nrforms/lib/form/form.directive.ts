import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash.clonedeep';

export interface NrfSubmitData {
  nrfForm: NrfFormDirective;
  formData: any;
  entity: any;
  formGroup: FormGroup;
  event: Event;
}

/**
 * A component to abstract the form implementation
 *
 * It holds the validation and the submit logic
 *
 * @example
 * <form nrfForm (nrfSubmit)="aCallback($event)">
 *  // Inputs
 * </form>
 */
@Directive({
  selector: 'form[nrfForm]',
  exportAs: 'nrfForm',
})
export class NrfFormDirective implements OnInit, OnDestroy {

  /**
   * Represents an Entity Model that comes from Database
   */
  @Input() nrfEntity: any;

  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Output() nrfSubmit = new EventEmitter<NrfSubmitData>();

  /**
   * Form group will hold all inputs within this form.
   *
   * Every input should register itself to this form group.
   *
   * The data in this form group will not be sent to backend, just form validations and input management.
   */
  formGroup: FormGroup;

  /**
   * The form data representing all inputs
   */
  formData: any;


  /**
   * @ignore
   */
  constructor() {
    this.formGroup = new FormGroup({});
  }


  /**
   * Init an empty nrfEntity, in case none where provided.
   */
  ngOnInit() {
    if (!this.nrfEntity) {
      this.nrfEntity = {};
    }

    this.formData = cloneDeep(this.nrfEntity);
  }

  ngOnDestroy() {
    this.nrfSubmit.complete();
  }


  /**
   * # Should not be called directly!
   * This method wraps the form validation and call [onSubmit]{@link NrfFormDirective#nrfSubmit}
   */
  @HostListener('submit', ['$event'])
  formSubmitWrapper($event: Event) {
    $event.preventDefault();

    if (!this.formGroup.valid) {
      return;
    }

    this.nrfSubmit.emit({
      nrfForm: this,
      formData: this.formData,
      entity: this.nrfEntity,
      formGroup: this.formGroup,
      event: $event,
    });
  }

}
