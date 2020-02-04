import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCheckboxComponent } from './tournament-checkbox.component';

describe('TournamentCheckboxComponent', () => {
  let component: TournamentCheckboxComponent;
  let fixture: ComponentFixture<TournamentCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
