import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';
import { NavController } from '@ionic/angular';
import { catchError, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const navigation = inject(NavController);

  return authService.retrieveCurrentUserDataResponse().pipe(
    switchMap((response) => {
      console.log(response);
      if (response.status !== 200) {
        navigation.navigateRoot('/login');
        return of(false);
      }
      else {
        localStorage.setItem('user', JSON.stringify(response.body));
        return of(true);
      }
    }),
    catchError((error) => {
      // Handle errors properly by navigating to the login page
      console.error('Error in auth guard:', error);
      navigation.navigateRoot('/login');
      return of(false);
    })
  );
};
