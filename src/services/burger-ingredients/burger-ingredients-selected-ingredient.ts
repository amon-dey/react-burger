import { createSlice } from '@reduxjs/toolkit';
import { IngredientItemType } from '../../utils/types';


type SelectedIngredientInitialStateType = {
    selectedIngredient: IngredientItemType | null;
};

const selectedIngredientInitialState: SelectedIngredientInitialStateType = {
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

