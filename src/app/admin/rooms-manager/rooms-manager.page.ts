import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Building } from 'src/app/interfaces/Building';
import { Room, RoomInput } from 'src/app/interfaces/Room';
import { BuildingService } from 'src/app/services/BuildingService';
import { RoomService } from 'src/app/services/RoomService';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.page.html',
  styleUrls: ['./rooms-manager.page.scss'],
  standalone: false,
})
export class RoomsManagerPage implements OnInit {

  room: RoomInput;
  roomList: Room[];
  selectedBuilding: Building | null;
  options : {
    buildings: Building[],
    workstations: String[]
  }

  constructor(private buildingService: BuildingService,
              public roomService: RoomService,
  ) {
    this.room = {
      id: 0,
      code: "",
      buildingCode: "",
      capacity: null,
      workstationType: null,
      workstationCount: null
    }

    this.options = {
      buildings: [],
      workstations: []
    }

    this.selectedBuilding = null;
    this.roomList = [];
  }

  ngOnInit() {

    const sources = [
      this.buildingService.getBuildings(),
      this.roomService.getWorkstationTypes()
    ];
  
    forkJoin(sources).subscribe((data: any) => {
      this.options.buildings = data[0];
      this.options.workstations = data[1];
    });
  }

  createRoom() {
    this.roomService.createRoom({
      code: this.room.code,
      capacity: this.room.capacity,
      buildingCode: this.selectedBuilding?.code,
      workstationType: this.room.workstationType,
      workstationCount: this.room.workstationCount
    }).subscribe((data: any) => {
      this.getRoomsForSelectedBuilding();
      this.reinitializeRoom();
    })
  }

  updateRoom() {
    console.log(this.room);
    this.roomService.updateRoom(this.room.id, {
      code: this.room.code,
      capacity: this.room.capacity,
      buildingCode: this.selectedBuilding?.code,
      workstationType: this.room.workstationType,
      workstationCount: this.room.workstationCount
    }).subscribe((data: any) => {
      this.getRoomsForSelectedBuilding();
      this.reinitializeRoom();
    })
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.id)
    .subscribe((data: any) => {
      this.getRoomsForSelectedBuilding();
      this.reinitializeRoom();
    })
  }

  setRoom(r: Room) {
    this.room = {
      id: r.id,
      code: r.code,
      capacity: r.capacity,
      buildingCode: r.buildingCode,
      workstationType: r.workstationType,
      workstationCount: r.workstationCount
    }
  }

  public async getRoomsForSelectedBuilding() {
    if (this.selectedBuilding == null) {
      console.log("No building selected");
      return;
    }

    return this.buildingService.getRoomsForBuilding(this.selectedBuilding.id)
      .subscribe((data: any) => {
        this.roomList = data;
      })
  }

  reinitializeRoom() {
    this.room = {
      id: 0,
      code: "",
      buildingCode: "",
      capacity: null,
      workstationType: null,
      workstationCount: null
    }
  }

}
