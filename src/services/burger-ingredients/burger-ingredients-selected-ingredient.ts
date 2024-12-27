import { createSlice } from '@reduxjs/toolkit';
import { ingredientItem } from '../../utils/types';


type selectedIngredientInitialStateType = {
    selectedIngredient: ingredientItem | null;
};

const selectedIngredientInitialState: selectedIngredientInitialStateType = {
    selectedIngredient: null,
};

export const selectedIngredientSlice = createSlice({
    name: 'burger-ingredients/selectedIngredient',
    initialState: selectedIngredientInitialState,
    reducers: {
        setSelected: (state, action) => {
            state.selectedIngredient = action.payload;
        },
        resetSelected: (state) => {
            state.selectedIngredient = null;
        },
    },
});

export const { setSelected, resetSelected } = selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;

