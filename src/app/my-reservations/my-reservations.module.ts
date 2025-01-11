import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservationsPageRoutingModule } from './my-reservations-routing.module';

import { MyReservationsPage } from './my-reservations.page';
import { ReservationWithRoomCardComponent } from '../components/reservation-with-room-card/reservation-with-room-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReservationsPageRoutingModule
  ],
  declarations: [MyReservationsPage, ReservationWithRoomCardComponent]
})
export class MyReservationsPageModule {}
