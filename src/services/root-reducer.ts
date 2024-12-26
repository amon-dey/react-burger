import { combineReducers } from 'redux';
import { BurgerIngredientsSlice } from './burger-ingredients/slice';
import { BurgerConstructorSlice } from './burger-constructor/slice'

export const rootReducer = combineReducers({
    burgerIngredients: BurgerIngredientsSlice.reducer,
    burgerConstructor: BurgerConstructorSlice.reducer
});