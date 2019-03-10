import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.scss'],
})
export class MerchandiseComponent implements OnInit {
  public products: Product[];

  constructor(
    private _productsService: ProductsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(p => {
      if ((p.bytype === 'category' || p.bytype === 'game') && p.type !== 'All') {
        this._productsService.getProducts(p.bytype, p.type).subscribe(products => {
          this.products = products;
        });
      } else {
        this._productsService.getProducts().subscribe(products => {
          this.products = products;
        });
      }
    });
  }

}
