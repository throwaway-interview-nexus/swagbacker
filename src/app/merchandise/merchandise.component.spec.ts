import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseComponent } from './merchandise.component';
import { MockComponent } from 'ng-mocks';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { MockStore, MockProductsService } from 'src/testing/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ACTIVE_INDEX } from '@angular/core/src/render3/interfaces/container';
import { ProductsService } from '../services/products/products.service';
import { from } from 'rxjs';

describe('MerchandiseComponent', () => {
  let component: MerchandiseComponent;
  let fixture: ComponentFixture<MerchandiseComponent>;
  let route: ActivatedRoute;
  let productsService: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiseComponent, MockComponent(ProductListComponent) ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: ProductsService, useValue: new MockProductsService() },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    productsService = TestBed.get(ProductsService);
    spyOn(productsService, 'getProducts').and.callThrough();

    fixture = TestBed.createComponent(MerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('route params call through', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('route params stub return value', () => {
    it('should call getProducts with no arguments if params are empty', () => {
      route.params = from([{}]);
      component.ngOnInit();
      expect(productsService.getProducts).toHaveBeenCalledWith();
    });

    it('should call getProducts with type arguments if provided', () => {
      route.params = from([{bytype: 'category', type: 'blah'}]);
      component.ngOnInit();
      expect(productsService.getProducts).toHaveBeenCalledWith('category', 'blah');
    });

    it('should call getProducts with no arguments if all selected', () => {
      route.params = from([{bytype: 'category', type: 'All'}]);
      component.ngOnInit();
      expect(productsService.getProducts).toHaveBeenCalledWith();
    });

    it('should call getProducts with no arguments if invalid bytype provided', () => {
      route.params = from([{bytype: 'invalid', type: 'blah'}]);
      component.ngOnInit();
      expect(productsService.getProducts).toHaveBeenCalledWith();
    });
  });
});
