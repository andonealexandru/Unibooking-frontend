import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservationsPageRoutingModule } from './my-reservations-routing.module';

import { MyReservationsPage } from './my-reservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReservationsPageRoutingModule
  ],
  declarations: [MyReservationsPage]
})
export class MyReservationsPageModule {}
