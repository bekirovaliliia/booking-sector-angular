import { TestBed } from '@angular/core/testing';

import { BookingManagingDataService } from './booking-managing-data.service';

describe('BookingManagingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingManagingDataService = TestBed.get(BookingManagingDataService);
    expect(service).toBeTruthy();
  });
});
