import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { Product } from '../interfaces/product';
import * as moment from 'moment';
import { sweepUpAnimation } from '../animations/sweepUp.animation';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sweepUpAnimation]
})
export class ProductListComponent implements OnInit {
  @Input() public products: Product[];

  constructor() { }

  ngOnInit() {
  }

  public getProductStatus(product: Product): string {
    if (product.status === 'Taking orders') {
      const now = moment();
      const daysLeft = moment(product.expiry).diff(now, 'days');
      return daysLeft + ' days left';
    }

    return product.status;
  }

}
