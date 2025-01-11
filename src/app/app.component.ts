import { Component } from '@angular/core';
import { User } from './interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'My reservations', url: '/my-reservations', icon: 'albums' },
    { title: 'Create a reservation', url: '/create-reservation', icon: 'add-circle' },
    { title: 'Calendar', url: '/folder/favorites', icon: 'calendar' },
    { title: 'My Account', url: '/folder/archived', icon: 'person' },
    { title: 'Sign out', url: '/folder/trash', icon: 'log-out' },
  ];
  constructor() {}
}
