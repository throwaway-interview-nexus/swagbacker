import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products/products.service';
import { MockProductsService } from 'src/testing/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let productsService: ProductsService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ProductsService, useClass: MockProductsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    productsService = TestBed.get(ProductsService);
    spyOn(productsService, 'getProducts').and.callThrough();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise maxId and formModel', () => {
    expect(component.formModel).toBeTruthy();
    expect(component['maxId']).not.toBeUndefined();
  });

  it('should call getProducts in constructor', () => {
    expect(productsService.getProducts).toHaveBeenCalled();
  });

  describe('addProduct', () => {
    beforeEach(() => {
      spyOn(productsService, 'addNewProduct').and.callThrough();
      router = TestBed.get(Router);
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should throw an error when expiry date has passed', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() - 5);
      component.formModel = {
        expiry
      };
      component.addProduct();
      expect(productsService.addNewProduct).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual('Expiry date has already passed. Set an expiry date in the future.');
    });

    it('should throw an error when goal is non-positive', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        expiry,
        goal: 0
      };
      component.addProduct();
      expect(productsService.addNewProduct).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual('Goal must be greater than 0.');
    });

    it('should throw an error when price is non-positive', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        expiry,
        goal: 1,
        price: 0
      };
      component.addProduct();
      expect(productsService.addNewProduct).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual('Price must be greater than 0.');
    });

    it('should throw an error when no images are specified', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        expiry,
        goal: 1,
        price: 1,
        imageUrls: ''
      };
      component.addProduct();
      expect(productsService.addNewProduct).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual('Must specify at least one image.');
    });

    it('should throw an error when not all fields are completed', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        expiry,
        goal: 1,
        price: 1,
        imageUrls: 'a'
      };
      component.addProduct();
      expect(productsService.addNewProduct).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual('All fields must be completed.');
    });

    it('should call addNewProduct when formModel is valid', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        name: 'a',
        description: 'a',
        category: 'a',
        game: 'a',
        goal: 5,
        price: 1,
        start: new Date(),
        expiry,
        imageUrls: 'a'
      };
      component.addProduct();
      expect(productsService.addNewProduct).toHaveBeenCalled();
    });

    it('should navigate home when formModel is valid', () => {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
      component.formModel = {
        name: 'a',
        description: 'a',
        category: 'a',
        game: 'a',
        goal: 5,
        price: 1,
        start: new Date(),
        expiry,
        imageUrls: 'a'
      };
      component.addProduct();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
