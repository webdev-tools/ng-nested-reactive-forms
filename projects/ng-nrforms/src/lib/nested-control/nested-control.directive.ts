import { Directive, Input, OnDestroy, OnInit, Optional, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeWhile } from 'rxjs/operators';

import { NrfFormDirective } from '../form/form.directive';
import { NrfFormService } from '../form/form.service';
import { NrfControlOptions } from './control-options.component';
import { NrfNestedControlContext } from './nested-control-context.class';
import { NrfFormHierarchyService } from './services/form-hierarchy.service';
import { NrfModelSetterService } from './services/model-setter.service';

/* tslint:disable ter-padded-blocks */

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
  isDestroyed = false;
  parentFormGroup: FormGroup | FormArray;
  formControl: FormControl;

  /**
   * Used to set and get value on the entity model
   */
  modelPath: string;

  /**
   * Array from model path split by '.'
   */
  private modelPieces: string[];

  /**
   * The last part of the dot-notation path provided on [nrfModelName]{@link nrfModelName} property.
   * Can be used with formControlName property
   */
  controlName: string;

  /**
   * Holds an instance of a NrfForm or a NrfService.
   * If the form is wrapped inside a directive with ng-content, the NrfFormService MUST be provided.
   * Otherwise the nrfForm will be used.
   */
  private formOrService: NrfFormDirective | NrfFormService;

  constructor(
    private readonly modelSetter: NrfModelSetterService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    @Optional() nrfForm: NrfFormDirective,
    @Optional() nrfFormService: NrfFormService,
    private readonly formHierarchy: NrfFormHierarchyService,
  ) {
    this.formOrService = nrfFormService || nrfForm;
  }

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
  @Output() readonly ready$ = new ReplaySubject(1);

  /**
   * Register this input component to its parent form [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   *
   * And starts to emit the input's value when it changes.
   */
  ngOnInit() {
    this.modelPath = this.getModelPathWithoutFirstPart();
    this.modelPieces = this.modelPath && this.modelPath.split('.');
    this.controlName = this.getControlName();
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
      this.removeFromParentFormGroup();
    }
  }

  private removeFromParentFormGroup() {
    if (this.parentFormGroup instanceof FormGroup) {
      this.parentFormGroup.removeControl(this.nrfModelName);
    } else {
      const index = this.parentFormGroup.controls.findIndex((control: any) => this.formControl === control);
      this.parentFormGroup.removeAt(index);
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
   * Returns the last part of the dot-notation path, that indicates the control name itself.
   */
  private getControlName(): string {
    const modelPieces = this.modelPieces;
    return modelPieces && modelPieces[modelPieces.length - 1];
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
    if (this.formOrService && this.modelPath) {
      return this.modelSetter.getValue(this.modelPath, this.formOrService.formData);
    }

    return null;
  }

  private showViewContent() {
    const context = new NrfNestedControlContext(
      this.formControl,
      this.formOrService && this.formOrService.formGroup,
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

    if (this.parentFormGroup) {
      if (this.parentFormGroup instanceof FormGroup) {
        this.parentFormGroup.addControl(this.modelPath, this.formControl);
      } else {
        const index = this.controlName;
        this.parentFormGroup.insert(parseInt(index, 10), this.formControl);
      }
    }
  }

  /**
   * Verify if this input is inside a [NrfFormDirective]{@link NrfFormDirective}
   * and return its [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   *
   * Otherwise a new empty [FormGroup]{@link https://angular.io/api/forms/FormGroup}
   */
  private getParentFormGroup(): FormGroup | FormArray {
    const rootFormGroup = this.formOrService && this.formOrService.formGroup;

    if (!rootFormGroup || !this.modelPath) {
      return null;
    }

    const formGroupPath = Array.from(this.modelPieces);
    return this.formHierarchy.getNestedControl(rootFormGroup, formGroupPath);
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
      .subscribe((newValue) => this.setModelValue(newValue));
  }

  /**
   * Set the value to the [formData]{@link NrfFormDirective#formData}
   */
  setModelValue(newValue: any) {
    if (this.formOrService && this.modelPath) {
      return this.modelSetter.setValue(this.modelPath, newValue || '', this.formOrService.formData);
    }
  }

  emitReadyState() {
    this.ready$.next(this);
  }
}
