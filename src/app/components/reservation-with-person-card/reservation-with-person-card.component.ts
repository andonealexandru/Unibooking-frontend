import { Component, Input, OnInit } from '@angular/core';
import { ReservationWithPerson } from 'src/app/interfaces/Reservation';
import { IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonChip, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'reservation-with-person-card',
  templateUrl: './reservation-with-person-card.component.html',
  styleUrls: ['./reservation-with-person-card.component.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCard, IonCardTitle, IonCardHeader, IonChip, IonCardContent],
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
