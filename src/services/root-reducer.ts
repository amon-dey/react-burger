import { combineReducers } from 'redux';
import { selectedIngredientSlice, currentActiveTabSlice, BurgerIngredientsSlice } from './burger-ingredients/slice';
import { BurgerConstructorSlice } from './burger-constructor/slice';

export const rootReducer = combineReducers({
    burgerIngredientsIngredient: BurgerIngredientsSlice.reducer,
    burgerIngredientsCurrentActiveTab: currentActiveTabSlice.reducer,
    burgerIngredientsSelectedIngredient: selectedIngredientSlice.reducer,
    burgerConstructor: BurgerConstructorSlice.reducer
});