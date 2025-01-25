import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsManagerPage } from './rooms-manager.page';

describe('RoomsManagerPage', () => {
  let component: RoomsManagerPage;
  let fixture: ComponentFixture<RoomsManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
