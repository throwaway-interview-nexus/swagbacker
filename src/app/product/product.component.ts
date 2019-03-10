import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import * as moment from 'moment';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ProductComponent implements OnInit {
  public product: Product;
  public mainImage: string;
  public message: string;

  constructor(
    private _productsService: ProductsService,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this._productsService.getProductById(+p.id).subscribe(product => {
        this.product = product;
        this.mainImage = product.imageUrls[0];
      });
    });
  }

  public getProductStatus(): string {
    if (this.product.status === 'Taking orders') {
      const now = moment();
      const daysLeft = moment(this.product.expiry).diff(now, 'days');
      if (daysLeft > 0) return daysLeft + ' days left (expires on ' + moment(this.product.expiry).subtract(1, 'minute').format('DD-MM-YYYY') + ')';
      const hoursLeft = moment(this.product.expiry).diff(now, 'hours');
      const minutesLeft = moment(this.product.expiry).diff(now, 'minutes');
      return `${hoursLeft}:${minutesLeft} left`;
    }

    return this.product.status;
  }

  public hasEnded(): boolean {
    return moment(this.product.expiry).isBefore(moment());
  }

  public hasStarted(): boolean {
    return moment(this.product.start).isBefore(moment());
  }

  public disabledText(): string {
    if (!this.hasStarted()) return 'The backing period for this item has not started yet. Be patient!';
    if (this.hasEnded()) return 'The backing period is over and we are no longer taking orders on this item.'
    return '';
  }

  public addToBasket(): void {
    if (!!this._authenticationService.user) {
      this._productsService.addToBasket(this.product);
      this.message = 'Added to basket';
      // Fade out the message after 3 seconds
      setTimeout(() => this.message = undefined, 3000);
    } else {
      // Can't add to basket if not logged in
      this._router.navigate(['/login']);
    }
  }

}
