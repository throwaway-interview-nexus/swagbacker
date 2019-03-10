import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MockAuthenticationService } from 'src/testing/mocks';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useValue: new MockAuthenticationService() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.callThrough();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on login', () => {
    spyOn(authService, 'login');
    component.login('', '', true);
    expect(authService.login).toHaveBeenCalledWith('', '', true);
  });

  it('should navigate home on login', () => {
    component.login('', '', true);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  describe('signup', () => {
    let signup: jasmine.Spy;

    beforeEach(() => {
      signup = spyOn(authService, 'signup');
    });

    it('should display error message returned', () => {
      signup.and.returnValue('errorMessage');
      expect(component.message).toBeUndefined();
      component.signup('', '', '');
      expect(component.message).toEqual('errorMessage');
    });

    it('should not navigate if error message returned', () => {
      signup.and.returnValue('errorMessage');
      component.signup('', '', '');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not set error message if none returned', () => {
      signup.and.returnValue('');
      component.signup('', '', '');
      expect(component.message).toBeUndefined();
    });

    it('should navigate home if no error message returned', () => {
      signup.and.returnValue('');
      component.signup('', '', '');
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
