import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { Store } from '@ngrx/store';
import { MockStore, MockProductsService } from 'src/testing/mocks';
import { ProductsService } from '../services/products/products.service';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let productsService: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: ProductsService, useValue: new MockProductsService() },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    productsService = TestBed.get(ProductsService);

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateProducts when placeOrder is called', () => {
    spyOn(productsService, 'updateProducts');
    component.placeOrder();
    expect(productsService.updateProducts).toHaveBeenCalled();
  });

  it('should call addToBasket when add is called', () => {
    spyOn(productsService, 'addToBasket');
    component.add({} as any);
    expect(productsService.addToBasket).toHaveBeenCalled();
  });

  it('should call removeFromBasket when remove is called', () => {
    spyOn(productsService, 'removeFromBasket');
    component.remove({} as any);
    expect(productsService.removeFromBasket).toHaveBeenCalled();
  });

  it('should call removeAllFromBasket when removeAll is called', () => {
    spyOn(productsService, 'removeAllFromBasket');
    component.removeAll({} as any);
    expect(productsService.removeAllFromBasket).toHaveBeenCalledWith({});
  });

  describe('basketIsEmpty', () => {
    it('should return true when basket is empty', () => {
      expect(component.basketIsEmpty()).toBeTruthy();
    });

    it('should return false when basket has items', () => {
      productsService.basket[1] = {} as any;
      expect(component.basketIsEmpty()).toBeFalsy();
    });

    it('should return true when sessionKey is set but no products are in basket', () => {
      productsService.basket.sessionKey = 'a';
      expect(component.basketIsEmpty()).toBeTruthy();
    });
  });

  describe('getBasketItems', () => {
    it('should return an empty array when basket is empty', () => {
      expect(component.getBasketItems()).toEqual([]);
    });

    it('should return an empty array when sessionKey is set basket is empty', () => {
      productsService.basket.sessionKey = 'a';
      expect(component.getBasketItems()).toEqual([]);
    });

    it('should return a list of products by count when basket has products', () => {
      productsService.basket[1] = {count: 1} as any;
      expect(component.getBasketItems().length).toEqual(1);
      expect(component.getBasketItems()[0].count).toEqual(1);
    });
  });

  describe('getTotal', () => {
    it('should return 0 when basket is empty', () => {
      expect(component.getTotal()).toEqual(0);
    });

    it('should return total price when basket has products', () => {
      const total = 51;
      const count = 3;
      productsService.basket[1] = {product: {price: total / count}, count} as any;
      expect(component.getTotal()).toEqual(total);
    });
  });
});
