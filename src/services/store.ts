import { configureStore } from '@reduxjs/toolkit';
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

import { combineReducers } from 'redux';
import { BurgerIngredientsSlice } from './burger-ingredients/burger-ingredients-ingrediets';
import { currentActiveTabSlice } from './burger-ingredients/burger-ingredients-current-activetab';
import { selectedIngredientSlice } from './burger-ingredients/burger-ingredients-selected-ingredient';
import { BurgerConstructorSlice } from './burger-constructor/burger-constructor-ingredients';
import { BurgerConstructorOrderSlice } from './burger-constructor/burger-constructor-order';

export const rootReducer = combineReducers({
    burgerIngredientsIngredient: BurgerIngredientsSlice.reducer,
    burgerIngredientsCurrentActiveTab: currentActiveTabSlice.reducer,
    burgerIngredientsSelectedIngredient: selectedIngredientSlice.reducer,
    burgerConstructorIngredients: BurgerConstructorSlice.reducer,
    BurgerConstructorOrder: BurgerConstructorOrderSlice.reducer
});
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();