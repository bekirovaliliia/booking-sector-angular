import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTabsComponent } from './booking-tabs.component';

describe('BookingTabsComponent', () => {
  let component: BookingTabsComponent;
  let fixture: ComponentFixture<BookingTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
