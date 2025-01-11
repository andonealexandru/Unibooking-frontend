import { Component, Input, OnInit } from '@angular/core';
import { ReservationWithPerson } from 'src/app/interfaces/Reservation';

@Component({
  selector: 'reservation-with-person-card',
  templateUrl: './reservation-with-person-card.component.html',
  styleUrls: ['./reservation-with-person-card.component.scss'],
  standalone: false
})
export class ReservationWithPersonCardComponent  implements OnInit {

  @Input({required: true}) reservation! : ReservationWithPerson;

  constructor() {
  }

  ngOnInit() {}

}
