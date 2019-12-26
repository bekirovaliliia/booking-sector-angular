import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTableRowComponent } from './tournament-table-row.component';

describe('TournamentTableRowComponent', () => {
  let component: TournamentTableRowComponent;
  let fixture: ComponentFixture<TournamentTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
