import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(
    private _productsService: ProductsService,
  ) { }

  ngOnInit() {
  }

  public basketIsEmpty(): boolean {
    return Object.keys(this._productsService.basket).filter(k => k !== 'sessionKey').length === 0;
  }

  public getBasketItems(): {product: Product, count: number}[] {
    return Object.keys(this._productsService.basket).filter(k => k !== 'sessionKey').map(k => this._productsService.basket[k]);
  }

  public getTotal(): number {
    return Object.keys(this._productsService.basket).filter(k => k !== 'sessionKey').reduce((sum, key) => {
      const curr = this._productsService.basket[key];
      return sum + (curr.count * curr.product.price);
    }, 0);
  }

  public placeOrder(): void {
    this._productsService.updateProducts();
  }

  public add(product: Product): void {
    this._productsService.addToBasket(product);
  }

  public remove(product: Product): void {
    this._productsService.removeFromBasket(product);
  }

  public removeAll(product: Product): void {
    this._productsService.removeAllFromBasket(product);
  }
}
