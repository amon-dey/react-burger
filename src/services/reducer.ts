
import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { burgerIngredientsInitialStateType } from "../utils/types";
import { fetchIngredients } from "./thunks/burgeringredients"

const myInitialState: burgerIngredientsInitialStateType = {
    ingredients: [],
    isLoading: false,
    isError: false
};

const BurgerIngredientsSlice = createSlice({
    name: 'burgeringredients',
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

export const rootReducer = combineReducers({
    burgerIngredients: BurgerIngredientsSlice.reducer
});

