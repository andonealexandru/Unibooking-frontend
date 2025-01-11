import { Component, OnInit } from '@angular/core';
import { Building } from '../interfaces/Building';
import { Room } from '../interfaces/Room';
import { BuildingService } from '../services/BuildingService';
import { forkJoin } from 'rxjs';
import { RoomService } from '../services/RoomService';
import { ReservationWithPerson } from '../interfaces/Reservation';
import { ReservationService } from '../services/ReservationService';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss'],
  standalone: false,
})
export class CreateReservationPage implements OnInit {

  public buildingList : Building[];
  public roomList : Room[];
  public selectedBuilding: Building | null;
  public selectedRoom : Room | null;
  public today: String;

  public isPreviousModalOpen: Boolean;
  public isNextModalOpen: Boolean;
  public isOverlappingModalOpen: Boolean;

  public newReservation : {
    room: Room | null,
    date: String,
    startHour: String,
    endHour: String
  };

  public reservationInfo: {
    previousReservation: ReservationWithPerson | null,
    nextReservation: ReservationWithPerson | null,
    reservationsOverlapping: ReservationWithPerson[]
  }

  constructor(private buildingService : BuildingService, private roomService : RoomService, private reservationService : ReservationService) {
    this.buildingList = [];
    this.roomList = [];
    this.selectedBuilding = null;
    this.selectedRoom = null;
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    this.today = date.toISOString().split('.')[0];
    date.setUTCHours(0,0,0,0);

    this.newReservation = {
      room: null,
      date: date.toISOString().split('.')[0],
      startHour: this.today,
      endHour: this.today
    };

    this.reservationInfo = {
      previousReservation: null,
      nextReservation: null,
      reservationsOverlapping: [],
    };

    this.isPreviousModalOpen = false;
    this.isOverlappingModalOpen = false;
    this.isNextModalOpen = false;
  }

  ngOnInit() {
   
    const sources = [
      this.buildingService.getBuildings()
    ];

    forkJoin(sources).subscribe((data: any) => {
      this.buildingList = data[0];
    });
  
  }

  public getRoomsForSelectedBuilding() {
    if (this.selectedBuilding == null) {
      console.log("No building selected");
      return;
    }
    this.buildingService.getRoomsForBuilding(this.selectedBuilding.id)
      .subscribe((data: any) => {
        this.roomList = data;
      })
  }

  public getReservationInfo() {

    if (this.newReservation.room === null) return;

    let reservationDate : Date = new Date(this.newReservation.date + '');
    let reservationStartTime : Date = new Date(this.newReservation.startHour + '');
    let reservationEndTime : Date = new Date(this.newReservation.endHour + '');

    let calculatedStartDate : Date = new Date(
      reservationDate.getFullYear(),
      reservationDate.getMonth(),
      reservationDate.getDate(),
      reservationStartTime.getHours() + 2,
      reservationStartTime.getMinutes()
    );

    let calculatedEndDate : Date = new Date(
      reservationDate.getFullYear(),
      reservationDate.getMonth(),
      reservationDate.getDate(),
      reservationEndTime.getHours() + 2,
      reservationEndTime.getMinutes()
    );

    this.roomService.getLastBookingForRoomBefore(this.newReservation.room.id, calculatedStartDate)
      .subscribe((data: any) => {
        this.reservationInfo.previousReservation = data;
      });

    this.roomService.getFirstBookingForRoomAfter(this.newReservation.room.id, calculatedEndDate)
      .subscribe((data: any) => {
        this.reservationInfo.nextReservation = data;
      })

    this.roomService.getBookingsForRoomBetween(this.newReservation.room.id, calculatedStartDate, calculatedEndDate)
      .subscribe((data: any) => {
        this.reservationInfo.reservationsOverlapping = data;
      });
  }

  public createReservation() {
    if (this.newReservation.room == null) return;

    let reservationStartTime : Date = new Date(this.newReservation.startHour + '');
    let reservationEndTime : Date = new Date(this.newReservation.endHour + '');

    this.reservationService.createReservation({
      date: this.newReservation.date.split('T')[0],
      startTime: reservationStartTime.getHours().toString().padStart(2, '0') + ":" + reservationStartTime.getMinutes().toString().padStart(2, '0'),
      endTime: reservationEndTime.getHours().toString().padStart(2, '0') + ":" + reservationEndTime.getMinutes().toString().padStart(2, '0'),
      roomCode: this.newReservation.room?.code
    }).subscribe();
  }


}
