# ng-nested-reactive-forms

![travis build](https://api.travis-ci.org/webdev-tools/ng-nested-reactive-forms.svg?branch=master)


Implement Nested FormControl for Angular Reactive Forms.

Split your forms as much as you need,
and let the nested reactive form components handle the data changes.

The `form` tag and the inputs doesn't have to share the same scope.

# Concepts

Enforce the usage of an `Entity`, also know as `Model`, to share data between the form and the controller.

Use two-way data-binding as [AngularJS 1.x](https://docs.angularjs.org/tutorial/step_06) does.

**Do not** mutate the original `Entity` when user make changes to inputs.

Define the data-binding using dot-notation e.g.: `user.addresses[1].streetName`

It is not necessary to pass the `Entity` through all nested components,  
**forms** and **inputs** will communicate with each other
no matter how deep the nested components are.

Submit event will only be triggered if all inputs are [Valid](https://angular.io/guide/form-validation).


# Usage

Only two directives are mandatory:

1. `nrfForm` on the `<form>` tag
2. `*nrfNestedControl` on a parent of a given `input`, `textarea`, `select`, or even a [custom component](https://angular.io/api/forms/DefaultValueAccessor).


## The Reactive `Form` tag

```html
<form
  nrfForm
  (nrfSubmit)="handleSubmit($event)"
  [nrfEntity]="anyObject"
>
<!-- All components and inputs -->
</form>
```

| Property    | type     | Description                                                                        |
|-------------|----------|------------------------------------------------------------------------------------|
| nrfForm     | --       | **Required** The main directive that enables communication with the nested inputs. |
| (nrfSubmit) | function | This `@Output` only will be called if all the inputs inside this form are valid.   |
| [nrfEntity] | Object   | The `Entity` that will be handled by this form. If not empty, inputs will be pre-filled using its data |


### Submit `$event` properties

| Property   | type               | Description                                          |
|------------|--------------------|------------------------------------------------------|
| entity     | Object             | A reference to the original `Entity` passed to the form tag |
| formData   | Object             | An Object containing all Entity's properties and changes made by the user |
| formGroup  | FormGroup          | The form FormGroup instance, used to validate fields |
| nrfForm    | nNgRFFormDirective | The nrfForm directive instance                       |
| event      | Event              | The original HTML event from the form submit         |



## The Reactive `input` tag

You have to put `*nrfNestedControl` on an input parent tag.  
And use `[formControl]` directly on the `input` tag, as described on
[Angular Reactive Forms](https://angular.io/guide/reactive-forms#create-the-template).

```html
<div *nrfNestedControl="'userModel.firstName'; let control=formControl">
  <input [formControl]="control" />
</div>
```

### Variables available in the context
| Name             | Description                                    |
|------------------|------------------------------------------------|
| formControl      | It is **mandatory** to use this on the given input, otherwise no data-binding or validation will be applied  |
| formGroup        | A reference to the form formGroup              |
| nrfNestedControl | The NestedControl instance                     |



# Motivation

[Angular](https://angular.io) has two approaches to handle forms:

1. [Template-driven forms](https://angular.io/guide/forms#template-driven-forms)
2. [Reactive Forms](https://angular.io/guide/reactive-forms#reactive-forms)

Both of them, require that the `<form>` and the `<input>` tags resides on the same "scope".
e.g.: 
```html
<form ....>
  <div ...>
    <input [ngModel]="firstName" /> <!-- Works! -->
  </div>
  <component-with-ng-content>
    <input [formControl]="myControlInstance" /> 
    <!-- Also Works!, even after it get rendered inside this component -->
  </component-with-ng-content>

  <!-- FAIL! Angular will not look on the rendered content -->
  <!-- Even though it will only renders an <input> and a <label> -->
  <my-input-with-label></my-input-with-label>
</form>
```

[NG_VALUE_ACCESSOR](https://angular.io/api/forms/DefaultValueAccessor) 
is available, but it has to share same "scope", as well.

---

Given these difficulties, it is very hard to "componentize" our App's forms.

Here is just a example on how one can split a form:

```html
<app-form-abstraction>
  <user-page>
    <user-personal-data></user-personal-data>
    <user-contacts></user-contacts>
    <user-addresses></user-addresses>
  </user-page>
  <default-form-buttons></default-form-buttons>
</app-form-abstraction>
```

Think about Reusability:
```html
<user-details-page>
  ....
  <modal-abstraction>
    <user-contacts></user-contacts> <!-- Yes, the same component -->
  </modal-abstraction>
  ....
</user-details-page>
```

## Versioning

```
+----- Major version is synchronize with Angular's major version.
| +--- Minor version has BREAKING CHANGE and features.
| | +- Patch version has fixes and features, but no breaking changes.
| | |
0.0.0
```
