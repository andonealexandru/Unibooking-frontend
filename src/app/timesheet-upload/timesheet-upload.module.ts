import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesheetUploadPageRoutingModule } from './timesheet-upload-routing.module';

import { TimesheetUploadPage } from './timesheet-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesheetUploadPageRoutingModule
  ],
  declarations: [TimesheetUploadPage]
})
export class TimesheetUploadPageModule {}
