import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSamplePageComponent } from './pages/form-sample-page/form-sample-page.component';

const routes: Routes = [
  { path: '', component: FormSamplePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
