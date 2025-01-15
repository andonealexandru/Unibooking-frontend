import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'My reservations', url: '/my-reservations', icon: 'albums', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
    { title: 'Create a reservation', url: '/create-reservation', icon: 'add-circle', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
    { title: 'Room finder', url: '/find-reservation', icon: 'search', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
    { title: 'Calendar', url: '/calendar', icon: 'calendar', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
    { title: 'Upload timesheet', url: '/timesheet-upload', icon: 'cloud-upload', access: ['ROLE_ADMIN']},
    { title: 'My Account', url: '/folder/archived', icon: 'person', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
    { title: 'Sign out', url: '/folder/trash', icon: 'log-out', access: ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_ADMIN'] },
  ];
  constructor() {
    let userData = localStorage.getItem('user');
    if (userData != null) {
      let role = JSON.parse(userData).role;
      console.log(role);
      this.appPages = this.appPages.filter(page => page.access.find(ac => ac === role) != null);
    }
  }
}
