import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MockAuthenticationService } from 'src/testing/mocks';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthenticationService, useValue: new MockAuthenticationService() }
      ],
      imports: [RouterTestingModule],
    });

    authService = TestBed.get(AuthenticationService);
  });

  it('should compile', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should return true if user is admin', inject([AdminGuard], (guard: AdminGuard) => {
      authService.user = {isAdmin: true} as any;
      expect(guard.canActivate({} as any, {} as any)).toBeTruthy();
    }));

    it('should return false if user is not admin', inject([AdminGuard], (guard: AdminGuard) => {
      authService.user = {isAdmin: false} as any;
      expect(guard.canActivate({} as any, {} as any)).toBeFalsy();
    }));

    it('should navigate to home if user is not admin', inject([AdminGuard], (guard: AdminGuard) => {
      authService.user = {isAdmin: false} as any;
      const router = TestBed.get(Router);
      spyOn(router, 'navigate').and.callThrough();
      guard.canActivate({} as any, {} as any);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));
  });
});
