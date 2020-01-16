import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutDatasComponent } from './without-datas.component';

describe('WithoutDatasComponent', () => {
  let component: WithoutDatasComponent;
  let fixture: ComponentFixture<WithoutDatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
