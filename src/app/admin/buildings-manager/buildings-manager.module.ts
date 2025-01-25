import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingsManagerPageRoutingModule } from './buildings-manager-routing.module';

import { BuildingsManagerPage } from './buildings-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingsManagerPageRoutingModule
  ],
  declarations: [BuildingsManagerPage]
})
export class BuildingsManagerPageModule {}
