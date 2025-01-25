import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsManagerPageRoutingModule } from './rooms-manager-routing.module';

import { RoomsManagerPage } from './rooms-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomsManagerPageRoutingModule
  ],
  declarations: [RoomsManagerPage]
})
export class RoomsManagerPageModule {}
