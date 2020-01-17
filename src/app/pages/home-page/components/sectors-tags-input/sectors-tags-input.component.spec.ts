import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsTagsInputComponent } from './sectors-tags-input.component';

describe('SectorsTagsInputComponent', () => {
  let component: SectorsTagsInputComponent;
  let fixture: ComponentFixture<SectorsTagsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsTagsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
