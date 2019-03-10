import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-goal-status',
  templateUrl: './goal-status.component.html',
  styleUrls: ['./goal-status.component.scss']
})
export class GoalStatusComponent implements OnInit {
  @Input() public product: Product;
  public percentRemaining: number;

  constructor() { }

  ngOnInit() {
    this.percentRemaining = this.product.orders > this.product.goal ?
      0 : 100 * (1 - (this.product.orders / this.product.goal));
  }

}
