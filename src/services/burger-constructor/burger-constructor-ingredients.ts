import { createSlice } from '@reduxjs/toolkit';
import { ingredientItem } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';


type burgerConstructorInitialStateType = {
    bun: ingredientItem | null;
    ingredients: ingredientItem[];
};

const burgerConstructorInitialState: burgerConstructorInitialStateType = {
    bun: null,
    ingredients: []
};

export const BurgerConstructorSlice = createSlice({
    name: 'burger-constructor/ingredients',
    initialState: burgerConstructorInitialState,
    reducers: {
        addIngredient: (state, action) => {
            state.ingredients = [...state.ingredients, {
                ...action.payload.item,
                uuid: uuidv4()
            }];
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
        },
        setBun: (state, action) => {
            state.bun = action.payload.item;
        },
        resetConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        }
    },
});

export const { addIngredient, removeIngredient, setBun, resetConstructor } = BurgerConstructorSlice.actions;
export default BurgerConstructorSlice.reducer;