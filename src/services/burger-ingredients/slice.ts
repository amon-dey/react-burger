import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from "../thunks/burgeringredients"
import { ingredientItem } from '../../utils/types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils';
import { ingredientItemTypes } from '../../utils/types';

export type burgerIngredientsInitialStateType = {
    ingredients: ingredientItem[] | null,
    isLoading: boolean,
    isError: boolean
    selectedIngredient: ingredientItem | null
    currentActiveTab: string | null
}

export const readActiveTabFromStorage = (): string => {
    const valueFromStoarege = loadFromLocalStorage("currentActiveTab", ingredientItemTypes[0].type);
    return ingredientItemTypes.some((item) => item.type === valueFromStoarege) ? valueFromStoarege : ingredientItemTypes[0].type;
};

const myInitialState: burgerIngredientsInitialStateType = {
    ingredients: null,
    isLoading: false,
    isError: false,
    selectedIngredient: null,
    currentActiveTab: ingredientItemTypes[0].type
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
        },
        setCurrentActiveTab: (state, action) => {
            state.currentActiveTab = action.payload;
            saveToLocalStorage("currentActiveTab", action.payload)
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

export const { setSelected, resetSelected, setCurrentActiveTab } = BurgerIngredientsSlice.actions;
export default BurgerIngredientsSlice.reducer;