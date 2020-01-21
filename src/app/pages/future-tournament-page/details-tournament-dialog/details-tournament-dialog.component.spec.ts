import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTournamentDialogComponent } from './details-tournament-dialog.component';

describe('DetailsTournamentDialogComponent', () => {
  let component: DetailsTournamentDialogComponent;
  let fixture: ComponentFixture<DetailsTournamentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTournamentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTournamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
