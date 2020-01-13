import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSectorFormComponent } from './booking-sector-form.component';

describe('BookSectorFormComponent', () => {
  let component: BookingSectorFormComponent;
  let fixture: ComponentFixture<BookingSectorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSectorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
