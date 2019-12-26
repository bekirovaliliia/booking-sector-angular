import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSectorFormComponent } from './book-sector-form.component';

describe('BookSectorFormComponent', () => {
  let component: BookSectorFormComponent;
  let fixture: ComponentFixture<BookSectorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSectorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
