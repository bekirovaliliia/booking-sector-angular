import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualBookingsTableComponent } from './actual-bookings-table.component';

describe('ActualBookingsTableComponent', () => {
  let component: ActualBookingsTableComponent;
  let fixture: ComponentFixture<ActualBookingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualBookingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualBookingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
