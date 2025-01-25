import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'My reservations', url: '/my-reservations', icon: 'albums', access: ['TEACHER', 'ADMIN'] },
    { title: 'Create a reservation', url: '/create-reservation', icon: 'add-circle', access: ['TEACHER', 'ADMIN'] },
    { title: 'Room finder', url: '/find-reservation', icon: 'search', access: ['STUDENT', 'TEACHER', 'ADMIN'] },
    { title: 'Calendar', url: '/calendar', icon: 'calendar', access: ['STUDENT', 'TEACHER', 'ADMIN'] },
    { title: 'Upload timesheet', url: '/timesheet-upload', icon: 'cloud-upload', access: ['ADMIN']},
    { title: 'Buildings Manager', url: '/buildings-manager', icon: 'business', access: ['ADMIN']},
    { title: 'Rooms Manager', url: '/rooms-manager', icon: 'easel', access: ['ADMIN']},
    { title: 'My Account', url: '/folder/archived', icon: 'person', access: ['STUDENT', 'TEACHER', 'ADMIN'] },
    { title: 'Sign out', url: '/sign-out', icon: 'log-out', access: ['STUDENT', 'TEACHER', 'ADMIN'] },
  ];
  constructor() {
    let userData = localStorage.getItem('user');
    if (userData != null) {
      let role = JSON.parse(userData).role;
      console.log(role);
      this.appPages = this.appPages.filter(page => page.access.find(ac => ac === role) != null);
    }
  }
  ngOnInit() {
    let userData = localStorage.getItem('user');
    if (userData != null) {
      let role = JSON.parse(userData).role;
      console.log(role);
      this.appPages = this.appPages.filter(page => page.access.find(ac => ac === role) != null);
    }
  }
}
