import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductsData } from './products.constants';
import { BasketState } from 'src/app/interfaces/basketState';
import { Store } from '@ngrx/store';
import { AddToBasket, RemoveFromBasket, RemoveAllFromBasket, ClearBasket, NewUser } from 'src/app/reducers/basket.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[];
  public basket: BasketState;
  public addProduct: EventEmitter<void>;

  constructor(
    private basketStore: Store<BasketState>
  ) {
    // Using the sessionStorage-backed RxJs store
    // to maintain the basket state - I feel like this
    // probably should have been its own BasketService
    // (if following SOLID principles), but I went too
    // deep to refactor it out with the time I had
    this.basketStore.select('basket').subscribe(s => {
      this.basket = s;
    });
    this.products = ProductsData;
    this.addProduct = new EventEmitter();
  }

  // Used Observable.from (which is apparently just from now) to
  // simulate the result of an http request to get products
  public getProducts(type?: string, typeName?: string): Observable<Product[]> {
    const products = type === undefined && typeName === undefined ?
      this.products :
      this.products.filter(p => p[type] === typeName);
    return from([products]);
  }

  public updateProducts(): void {
    const sessionKey = this.basket.sessionKey;
    const keys = Object.keys(this.basket).filter(k => k != 'sessionKey');
    for (let i = 0, tot = keys.length; i < tot; i++) {
      const product = this.products.find(p => p.id == +keys[i]);
      product.orders += this.basket[keys[i]].count;
      if (product.orders >= product.goal && product.status != 'Fully funded') {
        product.status = 'Fully funded';
      }
    }
    this.basketStore.dispatch(new ClearBasket());
    this.basketStore.dispatch(new NewUser(sessionKey));
  }

  public addNewProduct(product: Product): void {
    this.products.push(product);
    this.addProduct.emit();
  }

  public getProductById(id: number): Observable<Product> {
    return from([this.products.find(p => p.id === id)]);
  }

  public addToBasket(product: Product): void {
    this.basketStore.dispatch(new AddToBasket(product));
  }

  public removeFromBasket(product: Product): void {
    this.basketStore.dispatch(new RemoveFromBasket(product));
  }

  public removeAllFromBasket(product?: Product): void {
    if (product !== undefined) {
      this.basketStore.dispatch(new RemoveAllFromBasket(product));
    } else {
      this.basketStore.dispatch(new ClearBasket());
    }
  }
}
