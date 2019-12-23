import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManagingComponent } from './booking-managing.component';

describe('BookingManagingComponent', () => {
  let component: BookingManagingComponent;
  let fixture: ComponentFixture<BookingManagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingManagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
