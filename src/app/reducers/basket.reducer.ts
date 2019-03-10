import { Action } from '@ngrx/store';
import { BasketState } from '../interfaces/basketState';
import { Product } from '../interfaces/product';

export enum BasketActions {
    AddToBasket = 'ADD_TO_BASKET',
    RemoveFromBasket = 'REMOVE_FROM_BASKET',
    RemoveAllFromBasket = 'REMOVE_ALL_FROM_BASKET',
    ClearBasket = 'CLEAR_BASKET',
    NewUser = 'NEW_USER',
}

export class AddToBasket implements Action {
    readonly type = BasketActions.AddToBasket;
    product: Product;
    constructor(product: Product) { this.product = product; }
}

export class RemoveFromBasket implements Action {
    readonly type = BasketActions.RemoveFromBasket;
    product: Product;
    constructor(product: Product) { this.product = product; }
}

export class RemoveAllFromBasket implements Action {
    readonly type = BasketActions.RemoveAllFromBasket;
    product: Product;
    constructor(product: Product) { this.product = product; }
}

export class ClearBasket implements Action {
    readonly type = BasketActions.ClearBasket;
}

export class NewUser implements Action {
    readonly type = BasketActions.NewUser;
    constructor(public sessionKey: string) {}
}

const storedState = sessionStorage.getItem('basket');
const initialState: BasketState = storedState && storedState != 'null' && storedState != 'undefined' ? JSON.parse(storedState) : {};

export function basketReducer(state: BasketState = initialState, action: Action): BasketState {
    let payload: Product;
    switch (action.type) {
        case BasketActions.AddToBasket:
            payload = (action as AddToBasket).product;
            if (state[payload.id] !== undefined) {
                state[payload.id].count++;
            } else {
                state[payload.id] = {
                    product: payload,
                    count: 1
                };
            }
            break;
        case BasketActions.RemoveFromBasket:
            payload = (action as RemoveFromBasket).product;
            if (state[payload.id] !== undefined) {
                if (state[payload.id].count > 1) {
                    state[payload.id].count--;
                } else {
                    delete state[payload.id];
                }
            }
            break;
        case BasketActions.RemoveAllFromBasket:
            payload = (action as RemoveAllFromBasket).product;
            if (state[payload.id] !== undefined) {
                delete state[payload.id];
            }
            break;
        case BasketActions.ClearBasket:
            const keys = Object.keys(state);
            for (var i = 0, tot = keys.length; i < tot; i++) {
                delete state[keys[i]];
            }
            break;
        case BasketActions.NewUser:
            state.sessionKey = (action as NewUser).sessionKey;
            break;
    }
    sessionStorage.setItem('basket', JSON.stringify(state));
    return state;
}
