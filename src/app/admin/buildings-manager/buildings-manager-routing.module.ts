import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsManagerPage } from './buildings-manager.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingsManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingsManagerPageRoutingModule {}
