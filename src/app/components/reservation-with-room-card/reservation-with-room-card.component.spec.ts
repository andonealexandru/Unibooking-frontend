import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationWithRoomCardComponent } from './reservation-with-room-card.component';

describe('ReservationWithRoomCardComponent', () => {
  let component: ReservationWithRoomCardComponent;
  let fixture: ComponentFixture<ReservationWithRoomCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationWithRoomCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationWithRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
