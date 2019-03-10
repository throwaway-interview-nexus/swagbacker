import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[];

  constructor(
    private _productsService: ProductsService,
  ) { }

  ngOnInit() {
    this._productsService.getProducts(undefined, undefined).subscribe((products) => {
      this.products = products.filter(p => moment(p.start).isBefore(moment()) && moment(p.expiry).isAfter(moment()));
    });
  }

}
