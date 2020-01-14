import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearBtnComponent } from './clear-btn.component';

describe('ClearBtnComponent', () => {
  let component: ClearBtnComponent;
  let fixture: ComponentFixture<ClearBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
