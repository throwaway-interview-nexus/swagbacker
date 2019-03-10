import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GoalStatusComponent } from '../goal-status/goal-status.component';
import { MockComponent } from 'ng-mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsData } from '../services/products/products.constants';
import * as moment from 'moment';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent, MockComponent(GoalStatusComponent) ],
      imports: [ RouterTestingModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = ProductsData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getProductStatus', () => {
    it('should return status if status is not Taking orders', () => {
      expect(component.getProductStatus({status: 'Blah'} as any)).toEqual('Blah');
    });

    it('should return days left if status is Taking orders', () => {
      expect(component.getProductStatus({status: 'Taking orders', expiry: moment().add(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any)).toContain('days left');
    });
  });
});
