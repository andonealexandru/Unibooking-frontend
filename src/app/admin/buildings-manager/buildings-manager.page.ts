import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Building } from 'src/app/interfaces/Building';
import { BuildingService } from 'src/app/services/BuildingService';

@Component({
  selector: 'app-buildings-manager',
  templateUrl: './buildings-manager.page.html',
  styleUrls: ['./buildings-manager.page.scss'],
  standalone: false
})
export class BuildingsManagerPage implements OnInit {

  public building : Building;
  public buildingList : Building[];

  constructor(public buildingService: BuildingService) { 
    this.buildingList = [];
    this.building = {
      id: 0,
      code: "",
      address: "",
      start: this.getStartOfToday(),
      end: this.getEndOfToday()
    }
  }

  ngOnInit() {
    this.refreshBuildings();
  }

  reinitializeBuilding() {
    this.building = {
      id: 0,
      code: "",
      address: "",
      start: this.getStartOfToday(),
      end: this.getEndOfToday()
    }
  }

  refreshBuildings() {
    const sources = [
      this.buildingService.getBuildings()
    ];
  
    forkJoin(sources).subscribe((data: any) => {
      this.buildingList = data[0];
    });
  }

  public createBuilding() {
    this.buildingService.createBuilding({
      code: this.building.code,
      address: this.building.address,
      start: this.building.start.split('T')[1],
      end: this.building.end.split('T')[1]
    }).subscribe((data: any) => {
      this.refreshBuildings();
      this.reinitializeBuilding();
    })
  }

  public updateBuilding() {
    this.buildingService.updateBuilding(this.building.id, {
      code: this.building.code,
      address: this.building.address,
      start: this.building.start.split('T')[1],
      end: this.building.end.split('T')[1]
    }).subscribe((data: any) => {
      this.refreshBuildings();
      this.reinitializeBuilding();
    })
  }

  public deleteBuilding() {
    this.buildingService.deleteBuilding(this.building.id)
    .subscribe((data: any) => {
      this.refreshBuildings();
      this.reinitializeBuilding();
    })
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

  private getTimeOfDay(hour: number, minute: number) {
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60*60*1000));
    date.setUTCHours(hour,minute,0,0);
    return date.toISOString().split('.')[0];
  }

  public setBuilding(b : Building) {
    this.building = {
      id: b.id,
      code: b.code,
      address: b.address,
      start: this.getTimeOfDay(Number(b.start.split(':')[0]), Number(b.start.split(':')[1])),
      end: this.getTimeOfDay(Number(b.end.split(':')[0]), Number(b.end.split(':')[1]))
    }

  }

}
