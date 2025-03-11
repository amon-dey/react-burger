import { selectedIngredientSlice, setSelected, resetSelected, selectedIngredientInitialState } from './burger-ingredients-selected-ingredient';
import { IIngredient } from '../../utils/types';
import { mockIngredients } from '../../utils/__mocks__/mockData';


describe('selectedIngredientSlice', () => {
    describe('initial state', () => {
        it('должен инициализировать начальное состояние', () => {
            const initialState = selectedIngredientSlice.getInitialState();
            expect(initialState.selectedIngredient).toBeNull();
        });
    });

    describe('reducers', () => {
        it('setSelected должен устанавливать выбранный ингредиент', () => {
            const mockIngredient: IIngredient = mockIngredients[0]

            const action = setSelected(mockIngredient);
            const state = selectedIngredientSlice.reducer(undefined, action);

            expect(state.selectedIngredient).toEqual(mockIngredient);
        });

        it('resetSelected должен сбрасывать выбранный ингредиент', () => {
            const action = resetSelected();
            const state = selectedIngredientSlice.reducer(selectedIngredientInitialState, action);

            expect(state.selectedIngredient).toBeNull();
        });
    });
});