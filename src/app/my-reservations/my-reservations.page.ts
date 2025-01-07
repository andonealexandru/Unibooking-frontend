import { Component, OnInit } from '@angular/core';
import { Reservation } from '../interfaces/Reservation';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
  standalone: false,
})
export class MyReservationsPage implements OnInit {
  public isActionSheetOpen = false;
  public currentActionSheetButtons : any;
  public selectedReservationId : number | null = null;
  public actionSheetButtons = [
    {
      text: 'Check in',
      data: {
        action: 'check-in',
      },
    },
    {
      text: 'Edit Reservation',
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Cancel Reservation',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
  ];

  public reservationsForToday: Reservation[] = [];
  public currentReservation: Reservation | null = null;

  constructor() { }

  ngOnInit() {

    this.initReservations();
    this.initCurrenReservation();
    
  }

  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.isActionSheetOpen = false;

    if (event.detail.data == null) return;
    if (event.detail.data.action == null) return;

    switch (event.detail.data.action) {
      case 'check-in':
        console.log("check in", this.selectedReservationId);
        break;
      case 'edit':
        console.log("edit", this.selectedReservationId);
        break;
      case 'delete':
        console.log("delete", this.selectedReservationId);
        break;
      default:
        console.log("unknown", this.selectedReservationId);
        break;
    }
  }

  openActionSheet(id: number) {
    this.isActionSheetOpen = true;
    this.selectedReservationId = id;
    if (this.currentReservation?.id === id) {
      this.currentActionSheetButtons = [...this.actionSheetButtons];
    }
    else {
      this.currentActionSheetButtons = [...this.actionSheetButtons];
      this.currentActionSheetButtons.shift();
    }
  }

  initCurrenReservation() {

    if (this.reservationsForToday.length == 0) return;

    const now = new Date();

    const firstReservation = this.reservationsForToday[0];
    const [startHour, startMinute, startSecond] = firstReservation.startTime.split(':').map(Number);

    const reservationTime = new Date();
    reservationTime.setHours(startHour, startMinute, startSecond, 0);
    
    var MS_PER_MINUTE = 60000;
    const lowerBound = new Date(now.getTime() - 10 * MS_PER_MINUTE);
    const upperBound = new Date(now.getTime() + 10 * MS_PER_MINUTE);

    const isWithinBounds = reservationTime >= lowerBound && reservationTime <= upperBound;

    if (isWithinBounds) {
      console.log("Current reservation found");
      this.currentReservation = this.reservationsForToday[0];
      this.reservationsForToday.shift();
    }
    else {
      console.log("No current reservation!");
    }
  }

  initReservations() {
    this.reservationsForToday = [
      {
        id: 10012,
        date: "2024-01-06",
        startTime: "22:30:00",
        endTime: "10:00:00",
        roomCode: "PIII1"
      },
      {
        id: 10013,
        date: "2024-01-06",
        startTime: "10:01:00",
        endTime: "11:00:00",
        roomCode: "PIII1"
      },
      {
        id: 10014,
        date: "2024-01-06",
        startTime: "11:00:00",
        endTime: "15:00:00",
        roomCode: "PIII1"
      },
      {
        id: 10015,
        date: "2024-01-06",
        startTime: "19:00:00",
        endTime: "20:00:00",
        roomCode: "PIII1"
      }
  ];
  }

}
