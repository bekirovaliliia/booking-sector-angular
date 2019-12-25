import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsMapComponent } from './sectors-map.component';

describe('SectorsMapComponent', () => {
  let component: SectorsMapComponent;
  let fixture: ComponentFixture<SectorsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
