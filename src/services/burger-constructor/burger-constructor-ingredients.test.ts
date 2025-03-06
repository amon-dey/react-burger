import { burgerConstructorInitialState } from './burger-constructor-ingredients';
import {
    addIngredient,
    removeIngredient,
    hoverDropIndex,
    swapIngredient,
    setBun,
    resetConstructor,
} from './burger-constructor-ingredients';
import { BurgerConstructorSlice } from './burger-constructor-ingredients';
import { mockIngredients } from '../../utils/__mocks__/mockData';
import { IngredientItemType } from '../../utils/types';

describe('BurgerConstructorSlice Reducer', () => {
    const mockIngredient1: IngredientItemType = mockIngredients[0]
    const mockIngredient2: IngredientItemType = mockIngredients[1]
    const mockIngredient3: IngredientItemType = mockIngredients[2]

    it('initial state', () => {
        const initialState = undefined;
        const action = { type: 'unknown' };
        const state = BurgerConstructorSlice.reducer(initialState, action);

        expect(state).toEqual(burgerConstructorInitialState);
    });

    it('addIngredient action', () => {
        const action = addIngredient(mockIngredient1);
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.ingredients).toEqual([mockIngredient1]);
    });

    it('removeIngredient action', () => {
        const initialStateWithValues = {
            ...burgerConstructorInitialState,
            ingredients: [mockIngredient1, mockIngredient2],
        };

        const action = removeIngredient({ uuid: mockIngredient1.uuid });
        const state = BurgerConstructorSlice.reducer(initialStateWithValues, action);

        expect(state.ingredients).toEqual([mockIngredient2]);
    });

    it('hoverDropIndex action', () => {
        const action = hoverDropIndex(1);
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.ingredientToDrop).toBe(1);
    });

    it('swapIngredient action', () => {
        const initialStateWithValues = {
            ...burgerConstructorInitialState,
            ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
            ingredientToDrop: 1,
        };

        const action = swapIngredient({ ingredient: mockIngredient3 });
        const state = BurgerConstructorSlice.reducer(initialStateWithValues, action);

        expect(state.ingredients).toEqual([mockIngredient1, mockIngredient3, mockIngredient2]);
    });

    it('setBun action', () => {
        const action = setBun({ item: mockIngredient1 });
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.bun).toEqual(mockIngredient1);
    });

    it('resetConstructor action', () => {
        const initialStateWithValues = {
            ...burgerConstructorInitialState,
            bun: mockIngredient1,
            ingredients: [mockIngredient2, mockIngredient3],
        };

        const action = resetConstructor();
        const state = BurgerConstructorSlice.reducer(initialStateWithValues, action);

        expect(state.bun).toBeNull();
        expect(state.ingredients).toEqual([]);
    });
});