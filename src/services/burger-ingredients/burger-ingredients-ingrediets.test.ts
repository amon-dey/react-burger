import { BurgerIngredientsSlice } from './burger-ingredients-ingrediets';
import { fetchIngredients } from '../thunks/thunks';
import { mockPayloadIngedients } from '../../utils/__mocks__/mockData';

describe('BurgerIngredientsSlice', () => {
    describe('initial state', () => {
        it('должен инициализировать начальное состояние', () => {
            const initialState = BurgerIngredientsSlice.getInitialState();
            expect(initialState).toEqual({
                ingredients: null,
                isLoading: false,
                isError: false,
            });
        });
    });

    describe('extraReducers', () => {
        it('должен обновлять состояние при pending', () => {
            const action = { type: fetchIngredients.pending.type };
            const state = BurgerIngredientsSlice.reducer(undefined, action);

            expect(state.isLoading).toBe(true);
            expect(state.isError).toBe(false);
        });

        it('fulfilled', () => {
            const action = { type: fetchIngredients.fulfilled.type, payload: mockPayloadIngedients };
            const state = BurgerIngredientsSlice.reducer(undefined, action);

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(false);
            expect(state.ingredients).toEqual(mockPayloadIngedients.data);
        });

        it('rejected', () => {
            const action = { type: fetchIngredients.rejected.type };
            const state = BurgerIngredientsSlice.reducer(undefined, action);

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(true);
        });
    });
});