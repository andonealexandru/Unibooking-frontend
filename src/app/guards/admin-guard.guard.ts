import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';
import { NavController } from '@ionic/angular';

export const adminGuardGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthenticationService);
    const navigation = inject(NavController);
  
    let userData = localStorage.getItem('user');
    if (userData != null && JSON.parse(userData).role == 'ADMIN')
      return true;
  
    navigation.navigateRoot('/my-reservations');
    return false;
};
