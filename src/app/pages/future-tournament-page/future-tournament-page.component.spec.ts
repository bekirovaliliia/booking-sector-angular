import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureTournamentPageComponent } from './future-tournament-page.component';

describe('FutureTournamentPageComponent', () => {
  let component: FutureTournamentPageComponent;
  let fixture: ComponentFixture<FutureTournamentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureTournamentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureTournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
