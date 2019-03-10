import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { MockStore, MockAuthenticationService, MockProductsService } from '../testing/mocks';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ProductsService } from './services/products/products.service';
import { BasketState } from './interfaces/basketState';
import { from } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { User } from './interfaces/user';
import { ClearBasket, NewUser } from './reducers/basket.reducer';

describe('AppComponent', () => {
  let authService: AuthenticationService;
  let productsService: ProductsService;
  let store: Store<BasketState>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ProductsService, useClass: MockProductsService },
      ]
    }).compileComponents();

    authService = TestBed.get(AuthenticationService);
    authService.userSet = new EventEmitter<User>();
    productsService = TestBed.get(ProductsService);
    productsService.addProduct = new EventEmitter<void>();
    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(from([{} as BasketState]));
    spyOn(productsService, 'getProducts').and.callThrough();
    spyOn(productsService.addProduct, 'subscribe').and.callThrough();
    spyOn(authService.userSet, 'subscribe').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should subscribe to event emitters', () => {
    expect(productsService.addProduct.subscribe).toHaveBeenCalled();
    expect(authService.userSet.subscribe).toHaveBeenCalled();
  });

  it('should select the store', () => {
    expect(store.select).toHaveBeenCalledWith('basket');
  });

  it('should call getProducts', () => {
    expect(productsService.getProducts).toHaveBeenCalled();
  });

  it('should initialise categories, games and state', () => {
    expect(component.categories).not.toBeUndefined();
    expect(component.games).not.toBeUndefined();
    expect(component.state).not.toBeUndefined();
  });

  it('should call logout on logout', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should not dispatch if user is already set', () => {
    component.state.sessionKey = 'a';
    spyOn(store, 'dispatch');
    component.setUser({sessionKey: 'a'} as any);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch clear if user is undefined', () => {
    spyOn(store, 'dispatch');
    component.setUser(undefined);
    expect(store.dispatch).toHaveBeenCalledWith(new ClearBasket());
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should also dispatch new if user is not undefined and not already set', () => {
    component.state.sessionKey = undefined;
    spyOn(store, 'dispatch');
    component.setUser({sessionKey: 'a'} as any);
    expect(store.dispatch).toHaveBeenCalledWith(new NewUser('a'));
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
