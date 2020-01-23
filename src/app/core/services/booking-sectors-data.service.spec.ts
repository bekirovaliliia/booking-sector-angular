import { TestBed } from '@angular/core/testing';

import { BookingSectorsDataService } from './booking-sectors-data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingSectorsDataService = TestBed.get(BookingSectorsDataService);
    expect(service).toBeTruthy();
  });
});
