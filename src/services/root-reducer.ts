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