import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/interfaces/Reservation';

@Component({
  selector: 'reservation-with-room-card',
  templateUrl: './reservation-with-room-card.component.html',
  styleUrls: ['./reservation-with-room-card.component.scss'],
  standalone: false,
})
export class ReservationWithRoomCardComponent  implements OnInit {

  @Input({required: true}) reservation! : Reservation;
  @Input() color : String = '';

  constructor() { }

  ngOnInit() {}

}
