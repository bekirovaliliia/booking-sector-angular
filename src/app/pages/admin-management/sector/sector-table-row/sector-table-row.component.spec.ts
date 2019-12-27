import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorTableRowComponent } from './sector-table-row.component';

describe('SectorTableRowComponent', () => {
  let component: SectorTableRowComponent;
  let fixture: ComponentFixture<SectorTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
