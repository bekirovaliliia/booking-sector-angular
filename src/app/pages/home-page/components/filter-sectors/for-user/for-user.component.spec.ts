import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForUserComponent } from './for-user.component';

describe('ForUserComponent', () => {
  let component: ForUserComponent;
  let fixture: ComponentFixture<ForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
