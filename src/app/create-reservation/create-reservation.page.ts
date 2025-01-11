import { Component, OnInit } from '@angular/core';
import { Building } from '../interfaces/Building';
import { Room } from '../interfaces/Room';
import { BuildingService } from '../services/BuildingService';
import { forkJoin } from 'rxjs';
import { RoomService } from '../services/RoomService';
import { ReservationWithPerson } from '../interfaces/Reservation';
import { ReservationService } from '../services/ReservationService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss'],
  standalone: false,
})
export class CreateReservationPage implements OnInit {

  public today: String;
  public mode: String;

  public reservationId : number | null;
  public buildingList : Building[];
  public roomList : Room[];
  public selectedBuilding: Building | null;
  public selectedRoom : Room | null;

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

  constructor(private buildingService : BuildingService,
              private roomService : RoomService,
              private reservationService : ReservationService,
              private route : ActivatedRoute) {
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

    this.mode = 'ADD';
    this.reservationId = null;
  }

  ngOnInit() {
   
    const sources = [
      this.buildingService.getBuildings()
    ];

    forkJoin(sources).subscribe((data: any) => {
      this.buildingList = data[0];

      this.route.queryParams.subscribe((queryData: any) => {
        // ?building=
        // ?room=
        // ?date=
        // ?start=
        // ?end=
        // ?reservationId=
  
        if (!!queryData.date) this.newReservation.date = queryData.date;
        if (!!queryData.start) this.newReservation.startHour = queryData.start;
        if (!!queryData.end) this.newReservation.endHour = queryData.end;
        if (!!queryData.id) {
          this.mode = 'EDIT';
          this.reservationId = queryData.id;
        }
        if (!!queryData.building) {
          let buildingInList = this.buildingList.find(b => b.id == queryData.building);
          if (!!buildingInList) {
            this.selectedBuilding = buildingInList;
            this.getRoomsForSelectedBuilding(queryData.room);
          }
        }
      });
    });
  }

  public async getRoomsForSelectedBuilding(roomId : number | null) {
    if (this.selectedBuilding == null) {
      console.log("No building selected");
      return;
    }
    return this.buildingService.getRoomsForBuilding(this.selectedBuilding.id)
      .subscribe((data: any) => {
        this.roomList = data;
        if (!!roomId) {
          let roomInList = this.roomList.find(r => r.id == roomId);
            console.log()
            if (!!roomInList) {
              this.newReservation.room = roomInList;
            }
        }
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
