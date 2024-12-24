import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from "../thunks/burgeringredients"
import { ingredientItem } from '../../utils/types';

export type burgerIngredientsInitialStateType = {
    ingredients: ingredientItem[],
    isLoading: boolean,
    isError: boolean
}

const myInitialState: burgerIngredientsInitialStateType = {
    ingredients: [],
    isLoading: false,
    isError: false
};

export const BurgerIngredientsSlice = createSlice({
    name: 'burger-ingredients',
    initialState: myInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload) {
                    state.ingredients = action.payload.data;
                }
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});
