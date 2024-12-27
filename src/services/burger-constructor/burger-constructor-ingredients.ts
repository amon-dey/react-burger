import { createSlice } from '@reduxjs/toolkit';
import { IngredientItemType } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';


type BurgerConstructorInitialStateType = {
    bun: IngredientItemType | null;
    ingredients: IngredientItemType[];
    ingredientToDrop: number | null;
};

const burgerConstructorInitialState: BurgerConstructorInitialStateType = {
    bun: null,
    ingredients: [],
    ingredientToDrop: null
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
            state.ingredientToDrop = action.payload;
        },
        swapIngredient: (state, action) => {
            const dragIngredientIndex = state.ingredients.findIndex(item => item.uuid === action.payload.ingredient.uuid);
            if (state.ingredientToDrop === null) return;
            if (dragIngredientIndex === -1) return;
            const temp = state.ingredients[state.ingredientToDrop];
            state.ingredients[state.ingredientToDrop] = state.ingredients[dragIngredientIndex];
            state.ingredients[dragIngredientIndex] = temp;
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