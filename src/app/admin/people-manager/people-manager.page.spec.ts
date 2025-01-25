import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleManagerPage } from './people-manager.page';

describe('PeopleManagerPage', () => {
  let component: PeopleManagerPage;
  let fixture: ComponentFixture<PeopleManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
