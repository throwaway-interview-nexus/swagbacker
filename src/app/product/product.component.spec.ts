import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { MockComponent } from 'ng-mocks';
import { GoalStatusComponent } from '../goal-status/goal-status.component';
import { Store } from '@ngrx/store';
import { MockStore, MockProductsService, MockAuthenticationService } from 'src/testing/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '../services/products/products.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ProductsData } from '../services/products/products.constants';
import * as moment from 'moment';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let productsService: ProductsService;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent, MockComponent(GoalStatusComponent) ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: ProductsService, useValue: new MockProductsService() },
        { provide: AuthenticationService, useValue: new MockAuthenticationService() },
      ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    productsService = TestBed.get(ProductsService);
    authService = TestBed.get(AuthenticationService);

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductById on init', () => {
    spyOn(productsService, 'getProductById').and.returnValue(from([ProductsData[0]]));
    component.ngOnInit();
    expect(productsService.getProductById).toHaveBeenCalled();
  });

  describe('getProductStatus', () => {
    it('should return status if status is not Taking orders', () => {
      component.product = {status: 'Blah'} as any;
      expect(component.getProductStatus()).toEqual('Blah');
    });

    it('should return days left if status is Taking orders and > 0 days left', () => {
      component.product = {status: 'Taking orders', expiry: moment().add(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(component.getProductStatus()).toContain('days left');
    });

    it('should return days left if status is Taking orders and > 0 days left', () => {
      component.product = {status: 'Taking orders', expiry: moment().add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(/\d+\:\d+ left/.test(component.getProductStatus())).toBeTruthy();
    });
  });

  describe('hasEnded', () => {
    it('should return false if expiry date in future', () => {
      component.product = {expiry: moment().add(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(component.hasEnded()).toBeFalsy();
    });

    it('should return true if expiry date in past', () => {
      component.product = {expiry: moment().subtract(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(component.hasEnded()).toBeTruthy();
    });
  });

  describe('hasStarted', () => {
    it('should return false if start date in future', () => {
      component.product = {start: moment().add(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(component.hasStarted()).toBeFalsy();
    });

    it('should return true if start date in past', () => {
      component.product = {start: moment().subtract(3, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS')} as any;
      expect(component.hasStarted()).toBeTruthy();
    });
  });

  describe('disabledText', () => {
    it('should return not started if not started', () => {
      component.hasStarted = () => false;
      expect(component.disabledText()).toContain('has not started');
    });

    it('should return expired if expired', () => {
      component.hasStarted = () => true;
      component.hasEnded = () => true;
      expect(component.disabledText()).toContain('backing period is over');
    });

    it('should return empty string if ongoing', () => {
      component.hasStarted = () => true;
      component.hasEnded = () => false;
      expect(component.disabledText()).toEqual('');
    });
  });

  describe('addToBasket', () => {
    it('should call addToBasket if user populated', () => {
      spyOn(productsService, 'addToBasket');
      authService.user = {} as any;
      component.addToBasket();
      expect(productsService.addToBasket).toHaveBeenCalled();
    });

    it('should navigate to login if user not populated', () => {
      spyOn(productsService, 'addToBasket');
      spyOn(router, 'navigate').and.callThrough();
      authService.user = undefined;
      component.addToBasket();
      expect(productsService.addToBasket).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
