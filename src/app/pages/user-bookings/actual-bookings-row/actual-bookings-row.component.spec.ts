import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualBookingsRowComponent } from './actual-bookings-row.component';

describe('ActualBookingsRowComponent', () => {
  let component: ActualBookingsRowComponent;
  let fixture: ComponentFixture<ActualBookingsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualBookingsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualBookingsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
