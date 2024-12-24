import { createSlice } from '@reduxjs/toolkit';
import ingredientItem from '../../utils/types';

type burgerConstructorInitialStateType = {
    bun: ingredientItem | null
    ingredients: ingredientItem[]
}

const myInitialState: burgerConstructorInitialStateType = {
    bun: null,
    ingredients: [],
};

export const BurgerConstructorSlice = createSlice({
    name: 'burger-constructor',
    initialState: myInitialState,
    reducers: {
        addIngredients: (state, action) => {
            state.ingredients = [...state.ingredients, {
                ...action.payload,
            }];
        },
        removeIngredients: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload);
        },
        setBun: (state, action) => {
            state.bun = action.payload;
        },
    },
});
