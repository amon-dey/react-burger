import { createSlice } from '@reduxjs/toolkit';
import { ingredientItem } from '../../utils/types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils';
import { ingredientItemTypes } from '../../utils/types';
import { fetchIngredients } from "../thunks/burgeringredients";

//typesinitial stateState
const selectedIngredientInitialState: { selectedIngredient: ingredientItem | null; } = {
    selectedIngredient: null,
};

export const readActiveTabFromStorage = (): string => {
    const valueFromStoarege = loadFromLocalStorage("currentActiveTab", ingredientItemTypes[0].type);
    return ingredientItemTypes.some((item) => item.type === valueFromStoarege) ? valueFromStoarege : ingredientItemTypes[0].type;
};

const currentActiveInitialState: { currentActiveTab: string | null; } = {
    currentActiveTab: ingredientItemTypes[0].type
};


type burgerIngredientsInitialStateType = {
    ingredients: ingredientItem[] | null,
    isLoading: boolean,
    isError: boolean;
};

const burgerIngredientsInitialState: burgerIngredientsInitialStateType = {
    ingredients: null,
    isLoading: false,
    isError: false,
};

//slices 
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

export const currentActiveTabSlice = createSlice({
    name: 'burger-ingredients/currentActiveTab',
    initialState: currentActiveInitialState,
    reducers: {
        setCurrentActiveTab: (state, action) => {
            state.currentActiveTab = action.payload;
            saveToLocalStorage("currentActiveTab", action.payload);
        }
    },
});

export const BurgerIngredientsSlice = createSlice({
    name: 'burger-ingredients',
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


export const { setSelected, resetSelected } = selectedIngredientSlice.actions;
export const { setCurrentActiveTab } = currentActiveTabSlice.actions;
export default selectedIngredientSlice.reducer;

