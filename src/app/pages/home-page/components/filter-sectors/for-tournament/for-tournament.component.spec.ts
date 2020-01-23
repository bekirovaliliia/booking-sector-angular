import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForTournamentComponent } from './for-tournament.component';

describe('ForTournamentComponent', () => {
  let component: ForTournamentComponent;
  let fixture: ComponentFixture<ForTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
