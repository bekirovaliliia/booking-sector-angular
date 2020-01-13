import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutBookingsComponent } from './without-bookings.component';

describe('WithoutBookingsComponent', () => {
  let component: WithoutBookingsComponent;
  let fixture: ComponentFixture<WithoutBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
