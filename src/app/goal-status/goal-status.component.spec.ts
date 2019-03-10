import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalStatusComponent } from './goal-status.component';
import { ProductsData } from '../services/products/products.constants';

describe('GoalStatusComponent', () => {
  let component: GoalStatusComponent;
  let fixture: ComponentFixture<GoalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalStatusComponent);
    component = fixture.componentInstance;
    component.product = ProductsData[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the percentage value based on product data', () => {
    component.product.goal = 10;
    component.product.orders = 5;
    component.ngOnInit();
    expect(component.percentRemaining).toEqual(50);
  });

  it('should set the percentage to 0 if goal has been met', () => {
    component.product.goal = 10;
    component.product.orders = 12;
    component.ngOnInit();
    expect(component.percentRemaining).toEqual(0);
  });
});
