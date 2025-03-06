import { burgerConstructorOrderInitialState } from './burger-constructor-order';
import { setOrderIngredients, resetOrder } from './burger-constructor-order';
import { postOrder } from '../thunks/thunks';
import { BurgerConstructorOrderSlice } from './burger-constructor-order';
import { mockIngredients, mockCreateOrderPayload } from '../../utils/__mocks__/mockData';

describe('BurgerConstructorOrderSlice Reducer', () => {
    it('should return the initial state', () => {
        const initialState = undefined;
        const action = { type: 'unknown' };
        const state = BurgerConstructorOrderSlice.reducer(initialState, action);

        expect(state).toEqual(burgerConstructorOrderInitialState);
    });

    it('setOrderIngredients action', () => {
        const action = setOrderIngredients(mockIngredients);
        const state = BurgerConstructorOrderSlice.reducer(burgerConstructorOrderInitialState, action);

        expect(state.ingredintIdList).toEqual(mockIngredients);
    });

    it('resetOrder action', () => {
        const initialStateWithValues = {
            ...burgerConstructorOrderInitialState,
            ingredintIdList: mockIngredients,
            orderNumber: 12345,
            orederBurgerName: 'Test Burger',
        };

        const action = resetOrder();
        const state = BurgerConstructorOrderSlice.reducer(initialStateWithValues, action);

        expect(state.ingredintIdList).toEqual([]);
        expect(state.orderNumber).toBeNull();
        expect(state.orederBurgerName).toBe('');
    });

    it('postOrder.pending', () => {
        const action = { type: postOrder.pending.type };
        const state = BurgerConstructorOrderSlice.reducer(burgerConstructorOrderInitialState, action);

        expect(state.isLoading).toBe(true);
        expect(state.isError).toBe(false);
    });

    it('postOrder.fulfilled', () => {
        const action = { type: postOrder.fulfilled.type, payload: mockCreateOrderPayload };
        const state = BurgerConstructorOrderSlice.reducer(burgerConstructorOrderInitialState, action);

        expect(state.isLoading).toBe(false);
        expect(state.isError).toBe(false);
        expect(state.orderNumber).toBe(70191);
        expect(state.orederBurgerName).toBe('Краторный люминесцентный метеоритный бургер');
    });

    it('postOrder.rejected', () => {
        const action = { type: postOrder.rejected.type };
        const state = BurgerConstructorOrderSlice.reducer(burgerConstructorOrderInitialState, action);

        expect(state.isLoading).toBe(false);
        expect(state.isError).toBe(true);
        expect(state.orderNumber).toBeNull();
        expect(state.orederBurgerName).toBe('');
    });
});