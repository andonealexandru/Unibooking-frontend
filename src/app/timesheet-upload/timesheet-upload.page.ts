import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../services/TimesheetService';

@Component({
  selector: 'app-timesheet-upload',
  templateUrl: './timesheet-upload.page.html',
  styleUrls: ['./timesheet-upload.page.scss'],
  standalone: false,
})
export class TimesheetUploadPage implements OnInit {

  public timesheet: File | null = null;
  public timesheetStartDate: String;
  public timesheetEndDate: String;
  public foo: number = 5;
  public today: String;

  constructor(private timesheetService: TimesheetService) {
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    this.today = date.toISOString().split('.')[0];
    date.setUTCHours(0,0,0,0);

    this.timesheetStartDate = date.toISOString().split('.')[0];
    this.timesheetEndDate = date.toISOString().split('.')[0];
  }

  ngOnInit() {
  }

  handleFileInput(event: any) {
    console.log(event);
    this.timesheet = event.target.files[0];
  }

  isMonday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay === 1;
  };

  isSunday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay === 0;
  };

  uploadTimesheet() {
    this.timesheetService.uploadTimesheet(this.timesheet, this.timesheetStartDate, this.timesheetEndDate).subscribe((data: any) => {
      console.log(data);
    });
  }

}
