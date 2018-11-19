<a name="7.0.0"></a>
## 7.0.0 (2018-11-19)

* chore(Angular): Updated to Angular 7.x ([cda1989](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/cda1989))
* style: Adding read-only to property ([2fe2cec](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/2fe2cec))
* feat(demo): Created structure to show demo and code ([da1075f](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/da1075f))
* refactor(config): Trim settings and added suggested extensions ([346544b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/346544b))
* refactor(lint): Fix padded-blocks ([1a83d78](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/1a83d78))
* refactor(lint): Fix padded-blocks on demos ([de8583e](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/de8583e))
* refactor(tsconfig): Split configuration for better IDE tooling ([9c06b4c](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/9c06b4c))


### BREAKING CHANGE

* Angular breaking-changes
https://github.com/angular/angular/blob/master/CHANGELOG.md


<a name="6.2.6"></a>
## <small>6.2.6 (2018-07-27)</small>

* fix(formGroup): Fix generation of nested form-arrays ([e6bbd3d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e6bbd3d))



<a name="6.2.5"></a>
## <small>6.2.5 (2018-07-27)</small>

* fix(formGroup): Fix inserting new formControl at correct array position ([2cc2f6e](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/2cc2f6e))
* feat(formGroup): Created a hierarchy service to generate nested form groups and arrays ([783e077](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/783e077))
* feat(formGroup): Enabled nested-control to work with formControlName ([02f2f23](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/02f2f23))



<a name="6.2.4"></a>
## <small>6.2.4 (2018-07-24)</small>

* feat(nested-control): Set the parent form-group to form-control ([ace2520](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/ace2520))



<a name="6.2.3"></a>
## <small>6.2.3 (2018-07-06)</small>

* fix: Exporting form-service provider function ([e1da248](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e1da248))



<a name="6.2.2"></a>
## <small>6.2.2 (2018-07-06)</small>

* fix: Re-enabled form-service ([e6dcabc](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e6dcabc))
* fix: Renamed barrel imports to full-names and fix imports without index ([6d7bc0a](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/6d7bc0a))


### BREAKING CHANGE

* Form wrappers should provide NRF_FORM_SERVICE_PROVIDER


<a name="6.2.1"></a>
## <small>6.2.1 (2018-07-04)</small>

* feat: Renamed control-options @Inputs to make it more seamless ([15ba0d9](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/15ba0d9))
* test(validator): Added unit tests to control-options-component ([941a202](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/941a202))
* fix: Created a control-options component to be extended of while wrapping inputs ([2b2197a](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/2b2197a))



<a name="6.2.0"></a>
## 6.2.0 (2018-07-02)

* fix: Enabled nested-control to work without a model-path ([1d820fd](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/1d820fd))



<a name="6.1.0"></a>
## 6.1.0 (2018-07-01)

* build: Removed wrong installed dependencies from package.json ([e24ef5c](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e24ef5c))
* build(husky): Added --no-verify on post-version to avoid build twice while publishing ([a577b60](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/a577b60))
* build(husky): Updeated husky to avoid run hooks twice ([9baad37](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/9baad37))
* test: Fix unit tests and moved helper classes to individual files ([839464a](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/839464a))
* fix: Removed nested-form-service in order to inprove inputs and form interaction ([a7b816d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/a7b816d))


### BREAKING CHANGE

* NrfNestedFormService were removed and should be replaced by NrfFormDirective that
has the same signatures


<a name="6.0.3"></a>
## <small>6.0.3 (2018-06-28)</small>

* fix(nested-control): Fix replay feature on control's ready$ event ([eb7021b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/eb7021b))



<a name="6.0.2"></a>
## <small>6.0.2 (2018-06-27)</small>

* fix(nested-control): Added replay feature to control's ready$ event ([6e3668a](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/6e3668a))
* build: Changed post-version script to only push once and build once ([1471360](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/1471360))
* build: Removed travis email notifications ([eb49c9f](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/eb49c9f))



<a name="6.0.1"></a>
## <small>6.0.1 (2018-05-29)</small>

* fix: Downgrade to ES5 because angular-optimizations do not work with greater ([656df6b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/656df6b))
* docs(changelog): Added CHANGELOG includding all previous commits ([f04c912](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/f04c912))
* build: Setup conventional-changelog and validation on commit messages ([0a95b4e](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/0a95b4e))
* Migrated to Airbnb Style-Guide ([9009971](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/9009971))



<a name="6.0.0"></a>
## 6.0.0 (2018-05-26)

* 6.0.0 ([e6bc1cf](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e6bc1cf))
* Added key-words ([68ba675](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/68ba675))
* Fix lib build ([00142ce](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/00142ce))
* Fix samples after update to Angular 6 ([ee0e70a](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/ee0e70a))
* Fix sync-package script with new folders ([1f3db78](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/1f3db78))
* Migrated lib to Angular 6 project structure ([87d6a98](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/87d6a98))
* ran ng update ([3967578](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/3967578))



<a name="5.0.5"></a>
## <small>5.0.5 (2018-05-14)</small>

* 5.0.5 ([2d0ad37](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/2d0ad37))
* Fix date cloning issue ([4388951](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/4388951))



<a name="5.0.4"></a>
## <small>5.0.4 (2018-05-14)</small>

* 5.0.4 ([80bea44](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/80bea44))
* Fix bug on form submit and model cloning ([272d025](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/272d025))



<a name="5.0.3"></a>
## <small>5.0.3 (2018-05-11)</small>

* 5.0.3 ([d8f052d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/d8f052d))
* Added code coverage report ([b867060](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/b867060))
* Added puppeteer to test headless ([b07e2d0](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/b07e2d0))
* Added travis-ci build ([34a5de1](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/34a5de1))
* Fix downloads badge ([3c9594b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/3c9594b))
* Fix iml line-endings ([61d7f1b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/61d7f1b))
* Removed ng build progress to better logs on CI ([8eb391f](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/8eb391f))
* Set flag --no-sandbox to Chromium tests ([56f0d47](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/56f0d47))
* Updated repo url and badges ([22ac6d4](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/22ac6d4))



<a name="5.0.2"></a>
## <small>5.0.2 (2018-05-10)</small>

* 5.0.2 ([3ed706f](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/3ed706f))
* Update Exported dependencies to match Angular 5.x version ([3bcde53](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/3bcde53))



<a name="5.0.1"></a>
## <small>5.0.1 (2018-05-09)</small>

* 5.0.1 ([a93a204](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/a93a204))
* Added NestedFormService to increase nesting capabilities ([f36aa8c](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/f36aa8c))
* Changed major version to track Angular`s version ([b4b40b7](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/b4b40b7))
* Downgrade for Angular 5.x ([affdf8d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/affdf8d))
* Improved testes for structural form ([9b96e69](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/9b96e69))
* Initial unit test for NrfNestedFormService ([ee2f06d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/ee2f06d))
* Removed Host Listener and renamed variable to its actual functionality ([709c12f](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/709c12f))



<a name="1.2.0"></a>
## 1.2.0 (2018-05-09)

* 1.2.0 ([b6db09c](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/b6db09c))
* Fix Typo on README ([b4c2523](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/b4c2523))
* Updated README and renamed component ([5780805](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/5780805))



<a name="1.1.2"></a>
## <small>1.1.2 (2018-05-09)</small>

* 1.1.2 ([8cef852](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/8cef852))
* Including README and License on the package ([a8b9c30](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/a8b9c30))



<a name="1.1.1"></a>
## <small>1.1.1 (2018-05-09)</small>

* 1.1.0 ([c77cd13](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/c77cd13))
* 1.1.1 ([024d13b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/024d13b))
* Added step to sync the main package version with the lib ([82a63d3](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/82a63d3))



<a name="1.0.0"></a>
## 1.0.0 (2018-05-09)

* 1.0.0 ([961b124](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/961b124))
* Added sample page with custom input example ([28aee49](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/28aee49))
* Added script to test and build before bump version ([0f3a722](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/0f3a722))
* Added usage documentation, comcepts and motivation ([c1d718b](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/c1d718b))
* Changed the model to not mutate the original Entity ([0a7eada](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/0a7eada))
* Changes to keep all projects and libs under src folder ([c6affc8](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/c6affc8))
* Converted Form Component to a Directive to be more flexible on integrations ([a9a7ba0](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/a9a7ba0))
* Created form component ([62b4658](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/62b4658))
* Created model directive ([e655f29](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e655f29))
* Created the ng-rforms lib ([819470d](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/819470d))
* Initial commit with clean project and correct git attributes ([e63b2c4](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/e63b2c4))
* Installed angular/material to create samples ([8d6daca](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/8d6daca))
* Migrated to structural directive to enhance flexibility ([f3eaee2](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/f3eaee2))
* Mutating the property being set to trigger Changes Detection ([36113cd](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/36113cd))
* Removed lo-dash dependency ([0cdbc27](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/0cdbc27))
* Renamed namespace to better identify its functionality ([f1a51cc](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/f1a51cc))
* Updated formData behavior to include all Entity's properties ([096ebac](https://github.com/webdev-tools/ng-nested-reactive-forms/commit/096ebac))



