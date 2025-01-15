import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetUploadPage } from './timesheet-upload.page';

const routes: Routes = [
  {
    path: '',
    component: TimesheetUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetUploadPageRoutingModule {}
