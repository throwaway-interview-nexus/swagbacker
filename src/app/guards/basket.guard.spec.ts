import { TestBed, async, inject } from '@angular/core/testing';

import { BasketGuard } from './basket.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MockAuthenticationService } from 'src/testing/mocks';
import { Router } from '@angular/router';

describe('BasketGuard', () => {
  let authService: AuthenticationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BasketGuard,
        { provide: AuthenticationService, useValue: new MockAuthenticationService() }
      ],
      imports: [RouterTestingModule],
    });

    authService = TestBed.get(AuthenticationService);
  });

  it('should compile', inject([BasketGuard], (guard: BasketGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should return true if user is populated', inject([BasketGuard], (guard: BasketGuard) => {
      authService.user = {} as any;
      expect(guard.canActivate({} as any, {} as any)).toBeTruthy();
    }));

    it('should return false if user is not populated', inject([BasketGuard], (guard: BasketGuard) => {
      authService.user = undefined;
      expect(guard.canActivate({} as any, {} as any)).toBeFalsy();
    }));

    it('should navigate to login if user is not populated', inject([BasketGuard], (guard: BasketGuard) => {
      authService.user = undefined;
      const router = TestBed.get(Router);
      spyOn(router, 'navigate').and.callThrough();
      guard.canActivate({} as any, {} as any);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));
  });
});
