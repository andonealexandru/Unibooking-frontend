import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReservationPageRoutingModule } from './create-reservation-routing.module';

import { CreateReservationPage } from './create-reservation.page';
import { ReservationWithPersonCardComponent } from '../components/reservation-with-person-card/reservation-with-person-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReservationPageRoutingModule
  ],
  declarations: [CreateReservationPage, ReservationWithPersonCardComponent]
})
export class CreateReservationPageModule {}
