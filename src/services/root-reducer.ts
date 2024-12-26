import { combineReducers } from 'redux';
import { BurgerIngredientsSlice } from './burger-ingredients/ingrediets';
import { currentActiveTabSlice } from './burger-ingredients/current-activetab';
import { selectedIngredientSlice } from './burger-ingredients/selected-ingredient';
import { BurgerConstructorSlice } from './burger-constructor/constructor-ingredients'
import { BurgerConstructorOrderSlice } from './burger-constructor/order'

export const rootReducer = combineReducers({
    burgerIngredientsIngredient: BurgerIngredientsSlice.reducer,
    burgerIngredientsCurrentActiveTab: currentActiveTabSlice.reducer,
    burgerIngredientsSelectedIngredient: selectedIngredientSlice.reducer,
    burgerConstructorIngredients: BurgerConstructorSlice.reducer,
    BurgerConstructorOrder: BurgerConstructorOrderSlice.reducer
});