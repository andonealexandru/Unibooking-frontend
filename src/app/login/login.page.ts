import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  public emailValue = "";
  public passwordValue = "";

  constructor(public menuCtrl: MenuController, public router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  submitForm() {
    this.authenticationService.login({username: this.emailValue, password: this.passwordValue})
    .subscribe((data: any) => {
      localStorage.setItem('token', data);

      this.authenticationService.retrieveCurrentUserData()
      .subscribe((data: any) => {
        localStorage.setItem('user', JSON.stringify(data));

        this.menuCtrl.enable(true);
        this.router.navigate(['/my-reservations']);
      });
    });
  }

}
