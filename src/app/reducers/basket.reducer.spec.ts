import { BasketState } from '../interfaces/basketState';
import { basketReducer, AddToBasket, RemoveFromBasket, RemoveAllFromBasket, ClearBasket, NewUser } from './basket.reducer';

describe('basketReducer', () => {
    describe('AddToBasket', () => {
        it('should set property on the state if not present', () => {
            let state: BasketState = {};
            state = basketReducer(state, new AddToBasket({id: 1} as any));
            expect(state[1].count).toEqual(1);
        });

        it('should increment count if property present', () => {
            let state: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 1
                }
            };
            state = basketReducer(state, new AddToBasket({id: 1} as any));
            expect(state[1].count).toEqual(2);
        });
    });

    describe('RemoveFromBasket', () => {
        it('should not mutate state if property not present', () => {
            const initialState: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 1
                }
            };
            const state = basketReducer(initialState, new RemoveFromBasket({id: 2} as any));
            expect(state).toEqual(initialState);
        });

        it('should remove item entirely if only one in basket', () => {
            let state: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 1
                }
            };
            state = basketReducer(state, new RemoveFromBasket({id: 1} as any));
            expect(state[1]).toBeUndefined();
        });

        it('should remove one item if multiple in basket', () => {
            let state: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 2
                }
            };
            state = basketReducer(state, new RemoveFromBasket({id: 1} as any));
            expect(state[1].count).toEqual(1);
        });
    });

    describe('RemoveAllFromBasket', () => {
        it('should not mutate state if none in basket', () => {
            const initialState: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 1
                }
            };
            const state = basketReducer(initialState, new RemoveAllFromBasket({id: 2} as any));
            expect(state).toEqual(initialState);
        });

        it('should remove all from basket no matter the quantity', () => {
            let state: BasketState = {
                1: {
                    product: {id: 1} as any,
                    count: 3
                }
            };
            state = basketReducer(state, new RemoveAllFromBasket({id: 1} as any));
            expect(state[1]).toBeUndefined();
        });
    });

    describe('ClearBasket', () => {
        it('should remove everything from the basket, including session key', () => {
            let state: BasketState = {
                sessionKey: 'a',
                1: {
                    product: {id: 1} as any,
                    count: 3
                },
                3: {
                    product: {id: 3} as any,
                    count: 1
                }
            };

            state = basketReducer(state, new ClearBasket());
            expect(state).toEqual({});
        });
    });

    describe('NewUser', () => {
        it('should set the sessionKey if not present', () => {
            let state: BasketState = {};
            state = basketReducer(state, new NewUser('a'));
            expect(state.sessionKey).toEqual('a');
        });

        it('should override the existing sessionKey if present', () => {
            let state: BasketState = {
                sessionKey: 'a'
            };
            state = basketReducer(state, new NewUser('b'));
            expect(state.sessionKey).toEqual('b');
        });
    });
});
