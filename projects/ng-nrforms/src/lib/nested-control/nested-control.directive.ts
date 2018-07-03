import { Directive, Input, OnDestroy, OnInit, Optional, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeWhile } from 'rxjs/operators';

import { NrfFormDirective } from '../form/form.directive';
import { NrfModelSetterService } from './model-setter.service';
import { NrfNestedControlContext } from './nested-control-context.class';
import { NrfControlOptions } from './control-options.component';


/**
 * This directive control nested inputs and sets values on the Original Model set at {@link NrfFormDirective#nrfEntity}
 *
 * #### Given an nrfEntity on the controller:
 * ```typescript
 * this.userModel = {
 *    firstName: 'John',
 *    address: {
 *        street: 'Carnaby Street'
 *    }
 * };
 * ```
 *
 * #### Use it on the form
 * ```html
 * <form [nrfEntity]="userModel">
 *   <div class="form-group">
 *      <label for="name">Name:</label>
 *
 *      <div *nrfNestedControl="'userModel.firstName'; let control=formControl">
 *        <input [formControl]="control" />
 *      </div>
 *   </div>
 * </form>
 * ```
 */
@Directive({
  selector: '[nrfNestedControl]',
  exportAs: 'nrfNestedControl',
})
export class NrfNestedControlDirective implements OnInit, OnDestroy {

  // tslint:disable no-input-rename
  /**
   * The dot notation full name of the nrfEntity
   */
  @Input('nrfNestedControl') nrfModelName: string;

  /**
   * [AbstractControlOptions]{@link https://angular.io/api/forms/AbstractControlOptions}
   * containing the validators list and the update-on strategy
   *
   * It will be set on the formControl while initiating a new one.
   */
  @Input('nrfNestedControlControlOptions') controlOptions: NrfControlOptions;

  /**
   * Emit right after the view were rendered and the component and its variables ara available.
   */
  @Output() ready$ = new ReplaySubject(1);

  isDestroyed = false;
  parentFormGroup: FormGroup;
  formControl: FormControl;

  /**
   * Used to set and get value on the entity model
   */
  modelPath: string;


  constructor(
    private readonly modelSetter: NrfModelSetterService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    @Optional() private nrfForm: NrfFormDirective,
  ) {}


  /**
   * Register this input component to its parent form [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   *
   * And starts to emit the input's value when it changes.
   */
  ngOnInit() {
    this.modelPath = this.getModelPathWithoutFirstPart();
    this.formControl = this.getFormControl();
    this.registerToFormGroup();
    this.subscribeToUpdateEntityValue();
    this.showViewContent();
    this.emitReadyState();
  }


  ngOnDestroy() {
    this.isDestroyed = true;
    this.ready$.complete();

    if (this.parentFormGroup) {
      this.parentFormGroup.removeControl(this.nrfModelName);
    }
  }

   /**
   * Return the dot notation path of the Entity, without the first part,
   * because it is the Entity itself.
   */
  private getModelPathWithoutFirstPart(): string {
    const modelName = this.nrfModelName;
    return modelName && modelName.substr(modelName.indexOf('.') + 1);
  }

  /**
   * Instantiate a new [FormControl]{@link https://angular.io/api/forms/FormControl} and return it
   */
  protected getNewFormControl(): FormControl {
    const disabled = this.controlOptions && this.controlOptions.disabled;
    const value = this.getInitialValue();

    return new FormControl({ value, disabled }, this.controlOptions);
  }

  /**
   * Get the value from the [nrfEntity]{@link NrfFormDirective#nrfEntity}
   */
  protected getInitialValue(): any | null {
    if (this.nrfForm && this.modelPath) {
      return this.modelSetter.getValue(this.modelPath, this.nrfForm.formData);
    }

    return null;
  }

  private showViewContent() {
    const context = new NrfNestedControlContext(
      this.formControl,
      this.parentFormGroup,
      this,
    );

    this.viewContainerRef.createEmbeddedView(this.templateRef, context);
  }


  /**
   * Register this input to its parent [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   * to enable validations and data manipulation
   */
  private registerToFormGroup() {
    if (this.parentFormGroup) {
      return;
    }

    this.parentFormGroup = this.getParentFormGroup();

    if (this.parentFormGroup && this.nrfModelName) {
      setTimeout(() => this.parentFormGroup.addControl(this.nrfModelName, this.formControl));
    }
  }


  /**
   * Verify if this input is inside a [NrfFormDirective]{@link NrfFormDirective}
   * and return its [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   *
   * Otherwise a new empty [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   */
  private getParentFormGroup(): FormGroup {
    if (this.nrfForm) {
      return this.nrfForm.formGroup;
    }

    return null;
  }


  /**
   * Verify if the [FormGroup]{@link https://angular.io/api/forms/FormGroup} has an control with the current name and return it.
   * Otherwise return a new [FormControl]{@link https://angular.io/api/forms/FormControl}
   */
  protected getFormControl(): FormControl {
    const formGroup = this.getParentFormGroup();
    let formControl = formGroup && this.nrfModelName && <FormControl>formGroup.get(this.nrfModelName);

    if (!formControl) {
      formControl = this.getNewFormControl();
    }

    return formControl;
  }


  /**
   * Subscribe to [valueChanges]{@link https://angular.io/api/forms/AbstractControl#valueChanges} and update the Entity value
   */
  private subscribeToUpdateEntityValue() {
    this.formControl.valueChanges
      .pipe(takeWhile(() => !this.isDestroyed))
      .subscribe(newValue => this.setModelValue(newValue));
  }


  /**
   * Set the value to the [formData]{@link NrfFormDirective#formData}
   */
  setModelValue(newValue: any) {
    if (this.nrfForm && this.modelPath) {
      return this.modelSetter.setValue(this.modelPath, newValue || '', this.nrfForm.formData);
    }
  }

  emitReadyState() {
    this.ready$.next(this);
  }

}
