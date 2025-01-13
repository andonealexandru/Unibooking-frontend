import { Component, OnInit } from '@angular/core';
import { Building } from '../interfaces/Building';
import { Room } from '../interfaces/Room';
import { BuildingService } from '../services/BuildingService';
import { forkJoin } from 'rxjs';
import { RoomService } from '../services/RoomService';
import { ReservationWithPerson } from '../interfaces/Reservation';
import { ReservationWithPersonCardComponent } from '../components/reservation-with-person-card/reservation-with-person-card.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false,
})
export class CalendarPage implements OnInit {

  public options: {
    buildings: Building[],
    rooms: Room[],
  }

  public filters: {
    building: Building | null,
    room: Room | null,
    date: String
  }

  public calendar: ReservationWithPerson[];

  constructor(private buildingService: BuildingService,
              private roomService: RoomService
  ) {
    this.options = {
      buildings: [],
      rooms: []
    }

    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(0,0,0,0);

    this.filters = {
      building: null,
      room: null,
      date: date.toISOString().split('.')[0]
    }

    this.calendar = [];
  }

  ngOnInit() {

    const sources = [
      this.buildingService.getBuildings()
    ];
  
    forkJoin(sources).subscribe((data: any) => {
      this.options.buildings = data[0];
    });
  }

  public minusOneDay() {
    let date = new Date(this.filters.date + '');
    date.setDate(date.getDate() - 1);
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(0,0,0,0);
    this.filters.date = date.toISOString().split('.')[0];
  }

  public plusOneDay() {
    let date = new Date(this.filters.date + '');
    date.setDate(date.getDate() + 1);
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(0,0,0,0);
    this.filters.date = date.toISOString().split('.')[0];
  }

  public async getRoomsForSelectedBuilding() {
    if (this.filters.building == null) {
      console.log("No building selected");
      return;
    }

    return this.buildingService.getRoomsForBuilding(this.filters.building.id)
      .subscribe((data: any) => {
        this.options.rooms = data;
      })
  }

  public fetchCalendar() {
    if (this.filters.room == null)
      return;

    this.roomService.getBookingsForRoomForDate(this.filters.room.id, this.filters.date)
      .subscribe((data: any) => {
        this.calendar = data;
      })
  }

}
