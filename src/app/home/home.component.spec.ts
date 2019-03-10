import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { MockStore, MockProductsService } from 'src/testing/mocks';
import { ProductsService } from '../services/products/products.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productsService: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, MockComponent(ProductListComponent) ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: ProductsService, useValue: new MockProductsService() },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    productsService = TestBed.get(ProductsService);
    spyOn(productsService, 'getProducts').and.callThrough();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts', () => {
    expect(productsService.getProducts).toHaveBeenCalledWith();
  });

  it('should initialise products in ngOnInit', () => {
    expect(component.products).not.toBeUndefined();
    component.products = undefined;
    component.ngOnInit();
    expect(component.products).not.toBeUndefined();
  });
});
