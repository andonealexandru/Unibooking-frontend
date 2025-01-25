import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleManagerPageRoutingModule } from './people-manager-routing.module';

import { PeopleManagerPage } from './people-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleManagerPageRoutingModule
  ],
  declarations: [PeopleManagerPage]
})
export class PeopleManagerPageModule {}
