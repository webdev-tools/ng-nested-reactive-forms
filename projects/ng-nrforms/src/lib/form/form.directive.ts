import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { cloneDeep } from '../utils/clone-deep';


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
  selector: '[nrfForm]',
  exportAs: 'nrfForm',
})
export class NrfFormDirective implements OnInit, OnDestroy {

  /**
   * @ignore
   */
  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
  ) {}


  /**
   * Internal emitter to handle form submit
   */
  private submit$ = new EventEmitter<NrfSubmitData>();

  private entityInternal: any;

  /**
   * Form group will hold all inputs within this form.
   *
   * Every input should register itself to this form group.
   *
   * The data in this form group will not be sent to backend, just form validations and input management.
   */
  formGroup: FormGroup = new FormGroup({});

  /**
   * Represents the data inputted by the user on the fields
   */
  formData: any;

  /**
   * Represents an Entity Model that comes from Database
   */
  @Input()
  set nrfEntity(entity: any) {
    if (this.entityInternal !== entity) {
      this.entityInternal = entity;
      this.formData = cloneDeep(entity); // TODO merge with existent formData
    }
  }
  get nrfEntity(): any {
    return this.entityInternal;
  }


  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Output()
  get nrfSubmit(): EventEmitter<NrfSubmitData> {
    return this.submit$;
  }


  /**
   * Init an empty nrfEntity, in case none where provided.
   */
  ngOnInit() {
    if (!this.nrfEntity) {
      this.nrfEntity = {};
    }

    this.renderView();
  }


  ngOnDestroy() {
    this.nrfSubmit.complete();
  }


  private renderView() {
    if (this.templateRef && this.viewContainerRef) {
      const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
      const formNative = embeddedViewRef.rootNodes[0];
      this.renderer.listen(formNative, 'submit', event => this.formSubmitWrapper(event));
    }
  }


  /**
   * # Should not be called directly!
   * This method wraps the form validation and call [nrfSubmit]{@link NrfFormDirective#nrfSubmit}
   */
  @HostListener('submit', ['$event'])
  formSubmitWrapper($event: Event) {
    $event.preventDefault();

    if (!this.formGroup.valid) {
      return;
    }

    this.nrfSubmit.emit(new NrfSubmitData(this, $event));
  }

}

export class NrfSubmitData {

  nrfForm: NrfFormDirective;
  formData: any;
  entity: any;
  formGroup: FormGroup;
  event: Event;

  constructor(nrfForm: NrfFormDirective, $event: Event) {
    this.nrfForm = nrfForm;
    this.event = $event;
    this.formData = nrfForm.formData;
    this.entity = nrfForm.nrfEntity;
    this.formGroup = nrfForm.formGroup;
  }

}
