import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { alreadyAuthenticatedGuard } from './guards/already-authenticated.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [alreadyAuthenticatedGuard]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'my-reservations',
    loadChildren: () => import('./my-reservations/my-reservations.module').then( m => m.MyReservationsPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'create-reservation',
    loadChildren: () => import('./create-reservation/create-reservation.module').then( m => m.CreateReservationPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'find-reservation',
    loadChildren: () => import('./find-reservation/find-reservation.module').then( m => m.FindReservationPageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
