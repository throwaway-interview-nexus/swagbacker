import { Component } from '@angular/core';
import { User } from './interfaces/user';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ProductsService } from './services/products/products.service';
import { BasketState } from './interfaces/basketState';
import { Store } from '@ngrx/store';
import { ClearBasket, NewUser } from './reducers/basket.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public categories: string[];
  public games: string[];
  public user: User;
  public state: BasketState;
  public showMerchandise: boolean;

  constructor(
    private _authenticationService: AuthenticationService,
    private _productsService: ProductsService,
    private _basketStore: Store<BasketState>,
  ) {
    this._productsService.getProducts().subscribe(products => {
      // new Set(Array) returns distinct values if array is of primitives
      this.categories = [
        ...new Set(products.map(p => p.category).sort()),
        'All',
      ];

      this.games = [
        ...new Set(products.map(p => p.game).sort()),
        'All',
      ];
    });

    this._basketStore.select('basket').subscribe(state => {
      this.state = state;
    });

    // Hooking up user session to basket
    this._authenticationService.userSet.subscribe((u: User) => {
      this.setUser(u);
    });

    this._productsService.addProduct.subscribe(() => {
      this._productsService.getProducts().subscribe(products => {
        this.categories = [
          ...new Set(products.map(p => p.category).sort()),
          'All',
        ];

        this.games = [
          ...new Set(products.map(p => p.game).sort()),
          'All',
        ];
      });
    });

    this.setUser(this._authenticationService.user);

    this.showMerchandise = false;
  }

  public logout(): void {
    this._authenticationService.logout();
  }

  public setUser(user: User) {
    this.user = user;
    if (this.user === undefined || this.state.sessionKey !== this.user.sessionKey) {
      this._basketStore.dispatch(new ClearBasket());
      if (this.user !== undefined) {
        this._basketStore.dispatch(new NewUser(this.user.sessionKey));
      }
    }
  }
}
