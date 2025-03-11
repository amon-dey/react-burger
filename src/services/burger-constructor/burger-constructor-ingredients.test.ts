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
import { IIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

describe('BurgerConstructorSlice Reducer', () => {
    const mockIngredient1: IIngredient = { ...mockIngredients[0], uuid: uuidv4() }
    const mockIngredient2: IIngredient = { ...mockIngredients[1], uuid: uuidv4() }
    const mockIngredient3: IIngredient = { ...mockIngredients[2], uuid: uuidv4() }

    it('initial state', () => {
        const initialState = undefined;
        const action = { type: 'unknown' };
        const state = BurgerConstructorSlice.reducer(initialState, action);

        expect(state).toEqual(burgerConstructorInitialState);
    });

    it('addIngredient', () => {
        const action = addIngredient(mockIngredient1);
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.ingredients).toEqual([mockIngredient1]);
    });

    it('removeIngredient', () => {
        const initialStateWithValues = {
            ...burgerConstructorInitialState,
            ingredients: [mockIngredient1, mockIngredient2],
        };

        const action = removeIngredient({ uuid: mockIngredient1.uuid });
        const state = BurgerConstructorSlice.reducer(initialStateWithValues, action);

        expect(state.ingredients).toEqual([mockIngredient2]);
    });

    it('hoverDropIndex', () => {
        const action = hoverDropIndex(1);
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.ingredientToDrop).toBe(1);
    });

    it('swapIngredient', () => {
        const initialStateWithValues = {
            ...burgerConstructorInitialState,
            ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
            ingredientToDrop: 1,
        };

        const action = swapIngredient({ ingredient: mockIngredient3 });
        const state = BurgerConstructorSlice.reducer(initialStateWithValues, action);

        expect(state.ingredients).toEqual([mockIngredient1, mockIngredient3, mockIngredient2]);
    });

    it('setBun', () => {
        const action = setBun({ item: mockIngredient1 });
        const state = BurgerConstructorSlice.reducer(burgerConstructorInitialState, action);

        expect(state.bun).toEqual(mockIngredient1);
    });

    it('resetConstructor', () => {
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