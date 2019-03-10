import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOutAnimation],
})
export class LoginComponent implements OnInit {
  public message: string;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  // The isAdmin flag here is toggleable by any user logging in
  // as there is no data persistance to track user accounts
  public login(email: string, password: string, isAdmin: boolean): boolean {
    this._authenticationService.login(email, password, isAdmin);
    this._router.navigate(['/']);
    return false;
  }

  // Only performing confirmation validation on this, opted to leave
  // full validation as it's a given with form fields like this
  // (see admin component for onsubmit validation)
  public signup(email: string, password: string, confirmPassword: string): boolean {
    const errorMessage = this._authenticationService.signup(email, password, confirmPassword);
    if (errorMessage) {
      this.message = errorMessage;
    } else {
      this._router.navigate(['/']);
    }
    return false;
  }

}
