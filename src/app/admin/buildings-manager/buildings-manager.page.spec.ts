import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingsManagerPage } from './buildings-manager.page';

describe('BuildingsManagerPage', () => {
  let component: BuildingsManagerPage;
  let fixture: ComponentFixture<BuildingsManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
