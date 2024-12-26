import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils';
import { ingredientItemTypes } from '../../utils/types';


export const readActiveTabFromStorage = (): string => {
    const valueFromStoarege = loadFromLocalStorage("currentActiveTab", ingredientItemTypes[0].type);
    return ingredientItemTypes.some((item) => item.type === valueFromStoarege) ? valueFromStoarege : ingredientItemTypes[0].type;
};

const currentActiveInitialState: { currentActiveTab: string | null; } = {
    currentActiveTab: ingredientItemTypes[0].type
};

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

export const { setCurrentActiveTab } = currentActiveTabSlice.actions;
export default currentActiveTabSlice.reducer;