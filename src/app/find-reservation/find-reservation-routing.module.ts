import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindReservationPage } from './find-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: FindReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindReservationPageRoutingModule {}
