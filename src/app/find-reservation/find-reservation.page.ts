import { Component, OnInit } from '@angular/core';
import { Building } from '../interfaces/Building';
import { Room, RoomWithSlot } from '../interfaces/Room';
import { ReservationService } from '../services/ReservationService';
import { BuildingService } from '../services/BuildingService';
import { forkJoin } from 'rxjs';
import { RoomService } from '../services/RoomService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-reservation',
  templateUrl: './find-reservation.page.html',
  styleUrls: ['./find-reservation.page.scss'],
  standalone: false,
})
export class FindReservationPage implements OnInit {

  public isFilterMenuOpen: Boolean;
  public today: String;
  public startHourChanged: Boolean;
  public endHourChanged: Boolean;
  public timeslots : RoomWithSlot[];

  public options: {
    buildings: Building[],
    rooms: Room[],
    workstations: String[]
  }

  public filters: {
    building: Building | null,
    room: Room | null,
    date: String,
    startHour: String,
    endHour: String,
    workstationType: String | null,
    capacity: number | null,
    workstationCount: number | null
  }

  constructor(private reservationService: ReservationService,
              private buildingService: BuildingService,
              public roomService: RoomService,
              private router: Router
  ) {
    this.isFilterMenuOpen = true;
    this.startHourChanged = false;
    this.endHourChanged = false;
    this.timeslots = [];

    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    this.today = date.toISOString().split('.')[0];
    date.setUTCHours(0,0,0,0);

    this.filters = {
      building: null,
      room: null,
      date: date.toISOString().split('.')[0],
      startHour: this.getStartOfToday(),
      endHour: this.getEndOfToday(),
      workstationType: null,
      capacity: null,
      workstationCount: null
    }

    this.options = {
      buildings: [],
      rooms: [],
      workstations: []
    }
  }

  private getStartOfToday() {
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(0,0,0,0);
    return date.toISOString().split('.')[0];
  }

  private getEndOfToday() {
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(23,59,59,999);
    return date.toISOString().split('.')[0];
  }

  ngOnInit() {

    // this.filters.startHourChanged = false;
    // this.filters.endHourChanged = false;

    const sources = [
      this.buildingService.getBuildings(),
      this.roomService.getWorkstationTypes()
    ];
  
    forkJoin(sources).subscribe((data: any) => {
        this.options.buildings = data[0];
        this.options.workstations = data[1];
      });
  }

  public async getRoomsForSelectedBuilding() {
    if (this.filters.building == null) {
      console.log("No building selected");
      return;
    }
    
    if (this.startHourChanged === false) {
      this.filters.startHour = this.filters.startHour.slice(0, -8) + this.filters.building.start;
    }

    if (this.endHourChanged === false) {
      this.filters.endHour = this.filters.endHour.slice(0, -8) + this.filters.building.end;
    }

    return this.buildingService.getRoomsForBuilding(this.filters.building.id)
      .subscribe((data: any) => {
        this.options.rooms = data;
      })
  }

  public findRooms() {
    this.roomService.find(this.filters).subscribe((data: any) => {
      this.timeslots = data;
    });
  }

  public navigateToCreateReservationPage(timeslot: RoomWithSlot) {
    // date=2025-01-12T00:00:00&start=2025-01-11T19:00:23&end=2025-01-11T20:00:23&building=10000&room=10000

    this.router.navigate(['/create-reservation'],
      { queryParams: {
        date: timeslot.start.split('T')[0] + 'T00:00:00',
        start: timeslot.start,
        end: timeslot.end,
        building: timeslot.buildingCode,
        room: timeslot.code
      }}
    )
  }

}
