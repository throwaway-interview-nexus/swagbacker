import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import * as uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;
  public userSet: EventEmitter<User>;

  // User is also being tracked via sessionStorage -
  // would obviously hook in to API calls using HttpClientModule
  // if data persistence were a thing
  constructor() {
    this.userSet = new EventEmitter<User>();
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userSet.emit(this.user);
    }
  }

  public login(email: string, password: string, isAdmin: boolean): void {
    const sessionKey = uuid();
    const user = {
      email: email,
      sessionKey,
      isAdmin,
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.userSet.emit(user);
  }

  public signup(email: string, password: string, confirmPassword: string): string {
    if (password !== confirmPassword) {
      return 'Passwords must match';
    }
    const sessionKey = uuid();
    const user = {
      email: email,
      sessionKey,
      isAdmin: false,
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.userSet.emit(user);
    return '';
  }

  public logout(): void {
    this.user = undefined;
    sessionStorage.removeItem('user');
    this.userSet.emit(this.user);
  }
}
