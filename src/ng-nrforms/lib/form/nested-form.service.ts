// Created by Carlos Gomes on 2018-05-09
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NrfFormDirective } from './form.directive';

export interface NrfSubmitData {
  nrfForm: NrfFormDirective;
  formData: any;
  entity: any;
  formGroup: FormGroup;
  event: Event;
}

@Injectable()
export class NrfNestedFormService {

  private entityInternal: any;

  formGroup: FormGroup;
  formData: any;
  submit$ = new EventEmitter<NrfSubmitData>();

  set entity(entity: any) {
    this.entityInternal = entity;
    this.formData = this.cloneDeep(entity); // TODO merge with existent formData
  }
  get entity() {
    return this.entityInternal;
  }

  constructor() {
    this.formGroup = new FormGroup({});
  }


  cloneDeep(target: any | any[]): any {
    if (!target || typeof target !== 'object') {
      return target;
    }

    if (Array.isArray(target)) {
      return target.map(this.cloneDeep);
    }

    return Object.keys(target).reduce((props, key) => {
      props[key] = this.cloneDeep(target[key]);
      return props;
    }, {});
  }
}
