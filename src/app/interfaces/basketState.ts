import { Product } from './product';

export interface BasketState {
    sessionKey?: string;
    [key: number]: {
        product: Product,
        count: number
    }
}
