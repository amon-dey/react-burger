import { combineReducers } from 'redux';
import { BurgerIngredientsSlice } from './burgeringredients/slice';

export const rootReducer = combineReducers({
    burgerIngredients: BurgerIngredientsSlice.reducer
});