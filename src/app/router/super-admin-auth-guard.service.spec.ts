import { TestBed, inject } from '@angular/core/testing';

import { SuperAdminAuthGuard } from './super-admin-auth-guard.service';

describe('SuperAdminAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminAuthGuard]
    });
  });

  it('should be created', inject([SuperAdminAuthGuard], (service: SuperAdminAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
