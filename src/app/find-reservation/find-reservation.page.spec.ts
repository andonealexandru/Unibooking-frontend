import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindReservationPage } from './find-reservation.page';

describe('FindReservationPage', () => {
  let component: FindReservationPage;
  let fixture: ComponentFixture<FindReservationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
