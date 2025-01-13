import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { ReservationWithPersonCardComponent } from '../components/reservation-with-person-card/reservation-with-person-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    ReservationWithPersonCardComponent
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
