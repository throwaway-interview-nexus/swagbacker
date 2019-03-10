import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products/products.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeInOutAnimation],
})
export class AdminComponent implements OnInit {
  public formModel: any;
  public errorMessage: string;
  private maxId: number;

  constructor(
    private _productsService: ProductsService,
    private _router: Router,
  ) {
    this.formModel = {
      name: '',
      description: '',
      category: '',
      game: '',
      goal: 0,
      price: 0,
      start: new Date(),
      expiry: new Date(),
      imageUrls: ''
    };
    this._productsService.getProducts().subscribe(products => {
      this.maxId = products.reduce((prev, curr) => {
        return curr.id > prev ? curr.id : prev;
      }, 0);
    });
  }

  ngOnInit() {
  }

  public addProduct(): boolean {
    if (moment(this.formModel.expiry).isBefore(moment())) {
      this.errorMessage = 'Expiry date has already passed. Set an expiry date in the future.';
    } else if (this.formModel.goal <= 0) {
      this.errorMessage = 'Goal must be greater than 0.';
    } else if (this.formModel.price <= 0) {
      this.errorMessage = 'Price must be greater than 0.';
    } else if (this.formModel.imageUrls.length === 0) {
      this.errorMessage = 'Must specify at least one image.'
    } else if (!this.formModel.name || !this.formModel.description || !this.formModel.category || !this.formModel.game) {
      this.errorMessage = 'All fields must be completed.';
    } else {
      const product: Product = {
        id: this.maxId + 1,
        name: this.formModel.name,
        description: this.formModel.description,
        imageUrls: this.formModel.imageUrls.split(','),
        category: this.formModel.category,
        game: this.formModel.game,
        goal: this.formModel.goal,
        orders: 0,
        price: this.formModel.price,
        start: moment(this.formModel.start).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        expiry: moment(this.formModel.expiry).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        status: moment(this.formModel.start).isAfter(moment()) ? 'Announced' : 'Taking orders',
      };
      this._productsService.addNewProduct(product);
      this._router.navigate(['/']);
    }
    return false;
  }

}
