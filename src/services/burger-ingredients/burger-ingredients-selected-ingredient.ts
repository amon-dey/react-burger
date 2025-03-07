import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';


type SelectedIngredientInitialStateType = {
    selectedIngredient: IIngredient | null;
};

export const selectedIngredientInitialState: SelectedIngredientInitialStateType = {
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

