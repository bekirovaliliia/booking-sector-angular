import { TestBed, inject } from '@angular/core/testing';

import { UserAndAdminGuard } from './user-and-admin.guard';

describe('UserAndAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAndAdminGuard]
    });
  });

  it('should ...', inject([UserAndAdminGuard], (guard: UserAndAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
