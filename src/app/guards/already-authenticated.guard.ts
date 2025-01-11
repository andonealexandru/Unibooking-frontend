import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';
import { NavController } from '@ionic/angular';

export const alreadyAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const navigation = inject(NavController);

  if (!authService.isLoggedIn()) {
    return true;
  }

  navigation.navigateRoot('/my-reservations');
  return false;
};
