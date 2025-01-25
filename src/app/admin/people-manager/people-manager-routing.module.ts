import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleManagerPage } from './people-manager.page';

const routes: Routes = [
  {
    path: '',
    component: PeopleManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleManagerPageRoutingModule {}
