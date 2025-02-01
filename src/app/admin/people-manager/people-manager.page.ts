import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Building } from 'src/app/interfaces/Building';
import { UserWithPermissions } from 'src/app/interfaces/User';
import { BuildingService } from 'src/app/services/BuildingService';
import { PeopleService } from 'src/app/services/PeopleService';

@Component({
  selector: 'app-people-manager',
  templateUrl: './people-manager.page.html',
  styleUrls: ['./people-manager.page.scss'],
  standalone: false,
})
export class PeopleManagerPage implements OnInit {

  public selectedUser: UserWithPermissions | null;
  public peopleList: UserWithPermissions[];
  public buildingsList: Building[];
  public type: string | null;
  public query: string | null;
  public roleOptions = [
    {
      value: "STUDENT",
      label: "Student"
    },
    {
      value: "TEACHER",
      label: "Teacher"
    },
    {
      value: "ADMIN",
      label: "Administrator"
    }
  ];

  constructor(private peopleService: PeopleService,
              private buildingService: BuildingService
  ) {
    this.selectedUser = null;
    this.peopleList = [];
    this.buildingsList = [];
    this.type = null;
    this.query = null;
  }

  ngOnInit() {

    this.refreshPeople();
    this.refreshBuildings();
  }

  refreshPeople() {
    const sources = [
      this.peopleService.getAllPeople({
        type: this.type,
        query: this.query
      })
    ];
  
    forkJoin(sources).subscribe((data: any) => {
      this.peopleList = data[0];
    });
  }

  refreshBuildings() {
    const sources = [
      this.buildingService.getBuildings()
    ];
  
    forkJoin(sources).subscribe((data: any) => {
      this.buildingsList = data[0];
    });
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.query = target.value?.toLowerCase() || '';

    this.refreshPeople();
    
  }

  selectUser(p: UserWithPermissions) {
    console.log(p);
    this.selectedUser = {
      id: p.id,
      email: p.email,
      firstName: p.firstName,
      lastName: p.lastName,
      role: p.role,
      code: p.code,
      accessibleBuildings: [...p.accessibleBuildings]
    };
  }

  updatePerson() {
    if (this.selectedUser == null)
      return;

    this.peopleService.updatePerson(this.selectedUser.id, this.selectedUser).subscribe((data: any) => {
      this.refreshPeople();
      this.reinitializePerson();
    });
  }

  reinitializePerson() {
    this.selectedUser = null;
  }
}
