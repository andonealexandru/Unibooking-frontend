import { Component, Input, OnInit } from '@angular/core';
import { ReservationWithPerson } from 'src/app/interfaces/Reservation';
import { IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'reservation-with-person-card',
  templateUrl: './reservation-with-person-card.component.html',
  styleUrls: ['./reservation-with-person-card.component.scss'],
  imports: [IonCardSubtitle, IonCard, IonCardTitle, IonCardHeader, IonChip],
  standalone: true
})
export class ReservationWithPersonCardComponent implements OnInit {

  @Input({required: true}) reservation! : ReservationWithPerson;

  constructor() {
  }

  ngOnInit() {}

  public getNameByRole(role: string) {
    switch (role) {
      case 'STUDENT':
        return '(Student)';
      case 'TEACHER':
        return '(Teacher)';
      default:
        return '';
    }
  }

}
