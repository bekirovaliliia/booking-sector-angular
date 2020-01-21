import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectorDialogComponent } from './delete-sector-dialog.component';

describe('DeleteSectorDialogComponent', () => {
  let component: DeleteSectorDialogComponent;
  let fixture: ComponentFixture<DeleteSectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
