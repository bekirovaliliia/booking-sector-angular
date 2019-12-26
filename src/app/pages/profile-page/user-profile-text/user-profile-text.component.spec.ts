import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTextComponent } from './user-profile-text.component';


describe('UserProfileTextComponent', () => {
  let component: UserProfileTextComponent;
  let fixture: ComponentFixture<UserProfileTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
