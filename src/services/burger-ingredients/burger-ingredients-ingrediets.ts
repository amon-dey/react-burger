import { createSlice } from '@reduxjs/toolkit';
import { IngredientItemType } from '../../utils/types';
import { fetchIngredients } from "../thunks/thunks";


type BurgerIngredientsInitialStateType = {
    ingredients: IngredientItemType[] | null,
    isLoading: boolean,
    isError: boolean;
};

const burgerIngredientsInitialState: BurgerIngredientsInitialStateType = {
    ingredients: null,
    isLoading: false,
    isError: false,
};

export const BurgerIngredientsSlice = createSlice({
    name: 'burger-ingredients/ingredients',
    initialState: burgerIngredientsInitialState,
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

export default BurgerIngredientsSlice.reducer;

