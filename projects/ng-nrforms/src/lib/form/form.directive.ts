import {
  Directive,
  ElementRef,
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

import { NrfNestedFormService, NrfSubmitData } from './nested-form.service';

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
   * Represents an Entity Model that comes from Database
   */
  @Input()
  set nrfEntity(entity: any) {
    if (this.nestedFormService.entity !== entity) {
      this.nestedFormService.entity = entity;
    }
  }


  get nrfEntity(): any {
    return this.nestedFormService.entity;
  }


  get formData(): any {
    return this.nestedFormService.formData;
  }


  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Output()
  get nrfSubmit(): EventEmitter<NrfSubmitData> {
    return this.nestedFormService.submit$;
  }


  /**
   * Form group will hold all inputs within this form.
   *
   * Every input should register itself to this form group.
   *
   * The data in this form group will not be sent to backend, just form validations and input management.
   */
  get formGroup(): FormGroup {
    return this.nestedFormService.formGroup;
  }


  /**
   * @ignore
   */
  constructor(
    @Optional() private readonly nestedFormService: NrfNestedFormService,
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainerRef: ViewContainerRef,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    if (!this.nestedFormService) {
      this.nestedFormService = new NrfNestedFormService();
    }
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
      this.renderer.listen(formNative, 'submit', (event) => this.formSubmitWrapper(event));
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

    this.nrfSubmit.emit({
      nrfForm: this,
      formData: this.formData,
      entity: this.nrfEntity,
      formGroup: this.formGroup,
      event: $event,
    });
  }

}
