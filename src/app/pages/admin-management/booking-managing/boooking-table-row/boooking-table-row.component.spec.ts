import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoookingTableRowComponent } from './boooking-table-row.component';

describe('BoookingTableRowComponent', () => {
  let component: BoookingTableRowComponent;
  let fixture: ComponentFixture<BoookingTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoookingTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoookingTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
