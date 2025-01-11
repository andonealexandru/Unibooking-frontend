import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationWithPersonCardComponent } from './reservation-with-person-card.component';

describe('ReservationWithPersonCardComponent', () => {
  let component: ReservationWithPersonCardComponent;
  let fixture: ComponentFixture<ReservationWithPersonCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationWithPersonCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationWithPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
