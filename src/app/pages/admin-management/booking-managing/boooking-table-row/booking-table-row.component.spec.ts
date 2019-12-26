import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTableRowComponent } from './booking-table-row.component';

describe('BoookingTableRowComponent', () => {
  let component: BookingTableRowComponent;
  let fixture: ComponentFixture<BookingTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
