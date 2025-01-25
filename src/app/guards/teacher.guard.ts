import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';

export const teacherGuard: CanActivateFn = (route, state) => {
  const navigation = inject(NavController);

  let userData = localStorage.getItem('user');
  if (userData != null && (JSON.parse(userData).role == 'TEACHER' || JSON.parse(userData).role == 'ADMIN'))
    return true;

  navigation.navigateRoot('/calendar');
  return false;
};
