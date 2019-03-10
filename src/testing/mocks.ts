import { Observable, from } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsData } from 'src/app/services/products/products.constants';
import { Action } from '@ngrx/store';
import { BasketState } from 'src/app/interfaces/basketState';
import { User } from 'src/app/interfaces/user';
import { EventEmitter } from '@angular/core';

// I like to use a single file for my service mocks.
// If the file gets too big I'd refactor out to individual
// files within this directory.
// NB - I removed the e2e testing stuff manually, as I didn't
// want to spend too much time on both integrated and unit testing,
// so I focused on the unit testing as I'm more familiar with it
export class MockProductsService {
    getProducts(): Observable<Product[]> {
        return from([ProductsData]);
    }

    addNewProduct(product: Product): void {
        
    }

    getProductById(id: number): Observable<Product> {
        return from([ProductsData[0]]);
    }

    updateProducts(): void {

    }

    addToBasket(product: Product): void {

    }

    removeFromBasket(product: Product): void {

    }

    removeAllFromBasket(product?: Product): void {

    }

    basket: BasketState = {};
}

export class MockAuthenticationService {
    public user: User;
    public userSet: EventEmitter<User>;

    login(email: string, password: string, isAdmin: boolean): void {

    }

    signup(email: string, password: string, confirmPassword: string): string {
        return '';
    }

    logout(): void {
        
    }
}

export class MockStore<T> {
    select(name: string): Observable<T> {
        return from([{} as T]);
    }

    dispatch(action: Action): void {
        
    }
}