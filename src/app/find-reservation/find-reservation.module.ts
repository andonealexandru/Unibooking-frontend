import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindReservationPageRoutingModule } from './find-reservation-routing.module';

import { FindReservationPage } from './find-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindReservationPageRoutingModule
  ],
  declarations: [FindReservationPage]
})
export class FindReservationPageModule {}
