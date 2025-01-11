import { Component, OnInit } from '@angular/core';
import { Reservation } from '../interfaces/Reservation';
import type { OverlayEventDetail } from '@ionic/core';
import { ReservationService } from '../services/ReservationService';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

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
      text: 'Check out',
      data: {
        action: 'check-out',
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

  public reservations: Reservation[] = [];
  public activeReservation: Reservation | null = null;
  public reservationReadyForCheckIn: Reservation | null = null;
  
  constructor(private reservationService : ReservationService, public router: Router) {
    this.currentActionSheetButtons = this.actionSheetButtons;
  }

  ngOnInit() {
    const sources = [
      this.reservationService.getMyActiveBooking(),
      this.reservationService.getMyBookingReadyForCheckIn(),
      this.reservationService.getMyBookings(new Date())
    ];

    forkJoin(sources).subscribe((data: any) => {
      this.activeReservation = data[0];
      this.reservationReadyForCheckIn = data[1];
      this.reservations = data[2];

      this.removeActiveReservationsFromList();
    });

  }

  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.isActionSheetOpen = false;

    if (event.detail.data == null) return;
    if (event.detail.data.action == null) return;

    switch (event.detail.data.action) {
      case 'check-in':
        console.log("check in", this.selectedReservationId);
        break;
      case 'check-out':
        console.log("check out", this.selectedReservationId);
        break;
      case 'edit':
        console.log("edit", this.selectedReservationId);
        // date=2025-01-12T00:00:00&start=2025-01-11T19:00:23&end=2025-01-11T20:00:23&building=10000&room=10000&id=1000
        let selectedReservation = this.findReservation(this.selectedReservationId);
        if (selectedReservation == null) break;

        this.router.navigate(['/create-reservation'],
          { queryParams: {
            date: selectedReservation.date + 'T00:00:00',
            start: selectedReservation.date + 'T' + selectedReservation.startTime + ':00',
            end: selectedReservation.date + 'T' + selectedReservation.endTime + ':00',
            building: selectedReservation.buildingCode,
            room: selectedReservation.roomCode,
            id: selectedReservation.id
          }}
        )

        break;
      case 'delete':
        console.log("delete", this.selectedReservationId);
        break;
      default:
        console.log("unknown", this.selectedReservationId);
        break;
    }
  }

  removeActiveReservationsFromList() {
    this.reservations = this.reservations.filter((item) => item.id !== this.activeReservation?.id && item.id !== this.reservationReadyForCheckIn?.id);
  }

  findReservation(id: number | null) {
    if (id == null) return null;
    return this.reservations.find(r => r.id == id);
  }

  openActionSheet(id: number) {
    this.isActionSheetOpen = true;
    this.selectedReservationId = id;
    if (this.reservationReadyForCheckIn?.id === id) {
      this.currentActionSheetButtons = [...this.actionSheetButtons];
      this.currentActionSheetButtons.splice(1, 1);
    }
    else if (this.activeReservation?.id === id) {
      this.currentActionSheetButtons = [...this.actionSheetButtons];
      this.currentActionSheetButtons.splice(0, 1);
    }
    else {
      this.currentActionSheetButtons = [...this.actionSheetButtons];
      this.currentActionSheetButtons.splice(0, 2);
    }
  }

  refreshReservations(selectedDate: any) {
    const date = new Date(selectedDate);
    this.initReservationList(date);
  }

  initReservationList(date: Date) {
    return this.reservationService.getMyBookings(date)
      .subscribe((data: any) => {
        this.reservations = data;
        this.removeActiveReservationsFromList();
      });
  }

  initReservationReadyForCheckIn() {
    return this.reservationService.getMyBookingReadyForCheckIn()
      .subscribe((data: any) => {
        this.reservationReadyForCheckIn = data;
      });
  }

  initActiveReservation() {
    return this.reservationService.getMyActiveBooking()
      .subscribe((data: any) => {
        this.activeReservation = data;
      });
  }

}
