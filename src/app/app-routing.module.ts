import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { alreadyAuthenticatedGuard } from './guards/already-authenticated.guard';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { signOutGuard } from './guards/sign-out.guard';
import { teacherGuard } from './guards/teacher.guard';

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
    canActivate: [authGuard, teacherGuard],
  },
  {
    path: 'create-reservation',
    loadChildren: () => import('./create-reservation/create-reservation.module').then( m => m.CreateReservationPageModule),
    canActivate: [authGuard, teacherGuard],
  },
  {
    path: 'find-reservation',
    loadChildren: () => import('./find-reservation/find-reservation.module').then( m => m.FindReservationPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'timesheet-upload',
    loadChildren: () => import('./timesheet-upload/timesheet-upload.module').then( m => m.TimesheetUploadPageModule),
    canActivate: [authGuard, adminGuardGuard],
  },
  {
    path: 'buildings-manager',
    loadChildren: () => import('./admin/buildings-manager/buildings-manager.module').then( m => m.BuildingsManagerPageModule),
    canActivate: [authGuard, adminGuardGuard],
  },
  {
    path: 'rooms-manager',
    loadChildren: () => import('./admin/rooms-manager/rooms-manager.module').then( m => m.RoomsManagerPageModule),
    canActivate: [authGuard, adminGuardGuard],
  },
  {
    path: 'people-manager',
    loadChildren: () => import('./admin/people-manager/people-manager.module').then( m => m.PeopleManagerPageModule),
    canActivate: [authGuard, adminGuardGuard],
  },
  {
    path: 'sign-out',
    children: [],
    canActivate: [signOutGuard]
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
