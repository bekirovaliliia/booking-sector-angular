import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTableTournamentComponent } from './booking-table-tournament.component';

describe('BookingTableTournamentComponent', () => {
  let component: BookingTableTournamentComponent;
  let fixture: ComponentFixture<BookingTableTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTableTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTableTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
