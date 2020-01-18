import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTournamentDialogComponent } from './add-update-tournament-dialog.component';

describe('UpdateDialogComponent', () => {
  let component: AddUpdateTournamentDialogComponent;
  let fixture: ComponentFixture<AddUpdateTournamentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTournamentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTournamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
