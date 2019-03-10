import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this._authenticationService.user) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
