import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signOutGuard } from './sign-out.guard';

describe('signOutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
