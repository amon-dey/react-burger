import { createSlice } from '@reduxjs/toolkit';
import { ingredientItem } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';


type burgerConstructorInitialStateType = {
    bun: ingredientItem | null;
    ingredients: ingredientItem[];
    hoverDropIndex: number | null;
};

const burgerConstructorInitialState: burgerConstructorInitialStateType = {
    bun: null,
    ingredients: [],
    hoverDropIndex: null
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
        hoverDropIndex: (state, action) => {
            state.hoverDropIndex = action.payload;
        },
        swapIngredient: (state, action) => {
            const dragIndex = state.ingredients.findIndex(item => item.uuid === action.payload.ingredient.uuid);
            if (state.hoverDropIndex === null) {return}
            if (dragIndex===-1) {return}
            const temp = state.ingredients[state.hoverDropIndex];
            state.ingredients[state.hoverDropIndex] = state.ingredients[dragIndex];
            state.ingredients[dragIndex] = temp;
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

export const { addIngredient, removeIngredient, setBun, resetConstructor, swapIngredient, hoverDropIndex } = BurgerConstructorSlice.actions;
export default BurgerConstructorSlice.reducer;