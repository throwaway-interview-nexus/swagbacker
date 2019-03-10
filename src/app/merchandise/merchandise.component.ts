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
    // Note that I did not opt to do pagination, searching or sorting -
    // this was mostly due to time constraints and wanting to focus on
    // data persistence with RxJs as well as unit test coverage. I instead
    // opted for filtering by category/game as an option for this page.
    // For pagination I would likely use on-scroll loading for this page in
    // a real application
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
