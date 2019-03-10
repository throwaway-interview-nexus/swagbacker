import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    sessionStorage.clear();
  });

  it('should be created', () => {
    const service = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should find the user from sessionStorage if present', () => {
    sessionStorage.setItem('user', JSON.stringify({a: 'b'}));
    const service = TestBed.get(AuthenticationService);
    expect(service.user).toEqual({a: 'b'});
  });

  it('should leave the user unset if not in storage', () => {
    const service = TestBed.get(AuthenticationService);
    expect(service.user).toBeUndefined();
  });

  describe('login', () => {
    it('should populate user on login', () => {
      const service = TestBed.get(AuthenticationService);
      service.login('', '', true);
      expect(service.user).not.toBeUndefined();
    });

    it('should emit from userSet on login', () => {
      const service = TestBed.get(AuthenticationService);
      spyOn(service.userSet, 'emit');
      service.login('', '', true);
      expect(service.userSet.emit).toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    it('should return an error if passwords don\'t match', () => {
      const service = TestBed.get(AuthenticationService);
      spyOn(service.userSet, 'emit');
      expect(service.signup('', 'a', 'b')).toEqual('Passwords must match');
      expect(service.userSet.emit).not.toHaveBeenCalled();
    });

    it('should populate user on success', () => {
      const service = TestBed.get(AuthenticationService);
      expect(service.signup('', 'a', 'a')).toEqual('');
      expect(service.user).not.toBeUndefined();
    });

    it('should emit from userSet on success', () => {
      const service = TestBed.get(AuthenticationService);
      spyOn(service.userSet, 'emit');
      expect(service.signup('', 'a', 'a')).toEqual('');
      expect(service.userSet.emit).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear user', () => {
      const service = TestBed.get(AuthenticationService);
      service.user = {} as any;
      service.logout();
      expect(service.user).toBeUndefined();
    });

    it('should emit from userSet', () => {
      const service = TestBed.get(AuthenticationService);
      spyOn(service.userSet, 'emit');
      service.logout();
      expect(service.userSet.emit).toHaveBeenCalled();
    });
  });
});
