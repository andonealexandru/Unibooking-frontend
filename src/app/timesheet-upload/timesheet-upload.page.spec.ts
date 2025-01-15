import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimesheetUploadPage } from './timesheet-upload.page';

describe('TimesheetUploadPage', () => {
  let component: TimesheetUploadPage;
  let fixture: ComponentFixture<TimesheetUploadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
