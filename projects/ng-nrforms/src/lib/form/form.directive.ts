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

import { NrfFormContext } from './form-context.class';
import { NrfSubmitData } from './form-submit-data.class';
import { NrfFormService } from './form.service';

/* tslint:disable: ter-padded-blocks */
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
    @Optional() private readonly templateRef: TemplateRef<any>,
    @Optional() private readonly viewContainerRef: ViewContainerRef,
    @Optional() private readonly formService: NrfFormService,
    private readonly renderer: Renderer2,
  ) {
    if (!formService) {
      this.formService = new NrfFormService();
    }
  }

  /**
   * Represents an Entity Model that comes from Database
   */
  @Input()
  set nrfEntity(entity: any) {
    this.formService.entity = entity;
  }
  get nrfEntity(): any {
    return this.formService.entity;
  }

  get formData(): any {
    return this.formService.formData;
  }

  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  /**
   * A function that will be called when the form is valid and a submit event is triggered
   * by a button click or programmatically.
   */
  @Output()
  get nrfSubmit(): EventEmitter<NrfSubmitData> {
    return this.formService.submit$;
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
      const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, new NrfFormContext(this));
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
