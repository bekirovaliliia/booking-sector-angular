import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSectorsComponent } from './filter-sectors.component';

describe('FilterSectorsComponent', () => {
  let component: FilterSectorsComponent;
  let fixture: ComponentFixture<FilterSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
