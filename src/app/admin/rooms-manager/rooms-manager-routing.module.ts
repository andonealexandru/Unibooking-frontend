import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsManagerPage } from './rooms-manager.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsManagerPageRoutingModule {}
