import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';

export const signOutGuard: CanActivateFn = (route, state) => {

  const navigation = inject(NavController);

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  navigation.navigateRoot('/login');
  return false;
};
