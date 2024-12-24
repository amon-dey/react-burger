import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from "../thunks/burgeringredients"
import { ingredientItem } from '../../utils/types';

export type burgerIngredientsInitialStateType = {
    ingredients: ingredientItem[] | null,
    isLoading: boolean,
    isError: boolean
    selectedIngredient: ingredientItem|null
}

const myInitialState: burgerIngredientsInitialStateType = {
    ingredients: null,
    isLoading: false,
    isError: false,
    selectedIngredient: null
};

export const BurgerIngredientsSlice = createSlice({
    name: 'burger-ingredients',
    initialState: myInitialState,
    reducers: {
        setSelected: (state, action) => {
            state.selectedIngredient = action.payload;
        },
        resetSelected: (state) => {
            state.selectedIngredient = null
        }
    },
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

export const { setSelected, resetSelected } = BurgerIngredientsSlice.actions;
export default BurgerIngredientsSlice.reducer;