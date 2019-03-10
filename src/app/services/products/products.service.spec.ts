import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Store } from '@ngrx/store';
import { MockStore } from 'src/testing/mocks';
import { BasketState } from 'src/app/interfaces/basketState';
import { from } from 'rxjs';
import { ProductsData } from './products.constants';
import { AddToBasket, RemoveFromBasket, RemoveAllFromBasket, ClearBasket } from 'src/app/reducers/basket.reducer';

describe('ProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Store, useClass: MockStore },
    ]
  }));

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  it('should select basket from reducers', () => {
    const basketStore = TestBed.get(Store);
    spyOn(basketStore, 'select').and.returnValue(from([{} as BasketState]));
    TestBed.get(ProductsService);
    expect(basketStore.select).toHaveBeenCalledWith('basket');
  });

  it('should initialise basket, products and addProduct', () => {
    const service = TestBed.get(ProductsService);
    expect(service.basket).not.toBeUndefined();
    expect(service.products).not.toBeUndefined();
    expect(service.addProduct).not.toBeUndefined();
  });

  it('should dispatch on addToBasket', () => {
    const service = TestBed.get(ProductsService);
    const basketStore = TestBed.get(Store);
    spyOn(basketStore, 'dispatch');
    service.addToBasket({} as any);
    expect(basketStore.dispatch).toHaveBeenCalledWith(new AddToBasket({} as any));
  });

  it('should dispatch on removeFromBasket', () => {
    const service = TestBed.get(ProductsService);
    const basketStore = TestBed.get(Store);
    spyOn(basketStore, 'dispatch');
    service.removeFromBasket({} as any);
    expect(basketStore.dispatch).toHaveBeenCalledWith(new RemoveFromBasket({} as any));
  });

  it('should dispatch on removeAllFromBasket', () => {
    const service = TestBed.get(ProductsService);
    const basketStore = TestBed.get(Store);
    spyOn(basketStore, 'dispatch');
    service.removeAllFromBasket({} as any);
    expect(basketStore.dispatch).toHaveBeenCalledWith(new RemoveAllFromBasket({} as any));
  });

  it('should dispatch with ClearBasket on removeAllFromBasket with no arguments', () => {
    const service = TestBed.get(ProductsService);
    const basketStore = TestBed.get(Store);
    spyOn(basketStore, 'dispatch');
    service.removeAllFromBasket();
    expect(basketStore.dispatch).toHaveBeenCalledWith(new ClearBasket());
  });

  describe('getProducts', () => {
    it('should return all products when no arguments passed', () => {
      const service = TestBed.get(ProductsService);
      service.getProducts().subscribe(products => {
        expect(products.length).toEqual(ProductsData.length);
      });
    });

    it('should return a subset of products when type arguments are passed', () => {
      const service = TestBed.get(ProductsService);
      service.getProducts('category', 'Mugs').subscribe(products => {
        expect(products.reduce((prev, p) => prev && p.category === 'Mugs', true)).toBeTruthy();
      });
    });
  });

  describe('updateProducts', () => {
    it('should add to the order count of a product in the basket', () => {
      const service = TestBed.get(ProductsService);
      const product = ProductsData[0];
      const currentOrders = product.orders;
      service.basket[product.id] = {product, count: 1};
      service.updateProducts();
      expect(product.orders).toBeGreaterThan(currentOrders);
    });

    it('should set the status of a product if it is now fully funded', () => {
      const service = TestBed.get(ProductsService);
      const product = ProductsData.filter(p => p.status === 'Taking orders')[0];
      const currentStatus = product.status;
      service.basket[product.id] = {product, count: product.goal - product.orders};
      service.updateProducts();
      expect(product.status).not.toEqual(currentStatus);
      expect(product.status).toEqual('Fully funded');
    });

    it('should dispatch ClearBasket and NewUser to store', () => {
      const store = TestBed.get(Store);
      const service = TestBed.get(ProductsService);
      spyOn(store, 'dispatch');
      service.updateProducts();
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('addNewProduct', () => {
    it('should add a product to the products list', () => {
      const service = TestBed.get(ProductsService);
      const initialProductCount = service.products.length;
      service.addNewProduct({} as any);
      expect(service.products.length).toBeGreaterThan(initialProductCount);
    });

    it('should emit from the addProduct emitter', () => {
      const service = TestBed.get(ProductsService);
      spyOn(service.addProduct, 'emit');
      service.addNewProduct({} as any);
      expect(service.addProduct.emit).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return the product with the given id', () => {
      const product = ProductsData[0];
      const service = TestBed.get(ProductsService);
      service.getProductById(product.id).subscribe(p => {
        expect(p).toEqual(product);
      });
    });
  });
});
