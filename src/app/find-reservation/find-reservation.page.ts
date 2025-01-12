import { Component, OnInit } from '@angular/core';
import { Building } from '../interfaces/Building';
import { Room } from '../interfaces/Room';
import { ReservationService } from '../services/ReservationService';
import { BuildingService } from '../services/BuildingService';
import { forkJoin } from 'rxjs';
import { RoomService } from '../services/RoomService';

@Component({
  selector: 'app-find-reservation',
  templateUrl: './find-reservation.page.html',
  styleUrls: ['./find-reservation.page.scss'],
  standalone: false,
})
export class FindReservationPage implements OnInit {

  public isFilterMenuOpen: Boolean;
  public today: String;

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
    startHourChanged: Boolean,
    endHour: String,
    endHourChanged: Boolean,
    workstationType: String | null,
    capacity: number | null,
    workstationCount: number | null
  }

  constructor(private reservationService: ReservationService,
              private buildingService: BuildingService,
              public roomService: RoomService,
  ) {
    this.isFilterMenuOpen = true;

    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    this.today = date.toISOString().split('.')[0];
    date.setUTCHours(0,0,0,0);

    this.filters = {
      building: null,
      room: null,
      date: date.toISOString().split('.')[0],
      startHour: this.getStartOfToday(),
      startHourChanged: false,
      endHour: this.getEndOfToday(),
      endHourChanged: false,
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
    
    if (this.filters.startHourChanged === false) {
      this.filters.startHour = this.filters.startHour.slice(0, -8) + this.filters.building.start;
    }

    if (this.filters.endHourChanged === false) {
      this.filters.endHour = this.filters.endHour.slice(0, -8) + this.filters.building.end;
    }

    return this.buildingService.getRoomsForBuilding(this.filters.building.id)
      .subscribe((data: any) => {
        this.options.rooms = data;
      })
  }

}
