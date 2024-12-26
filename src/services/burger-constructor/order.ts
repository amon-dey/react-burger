import { createSlice } from '@reduxjs/toolkit';
import ingredientItem from '../../utils/types';

type burgerConstructorOrderInitialStateType = {
    ingredients: ingredientItem[];
    orderNumber: number | null
};

const burgerConstructorOrderInitialState: burgerConstructorOrderInitialStateType = {
    ingredients: [],
    orderNumber: null
};

export const BurgerConstructorOrderSlice = createSlice({
    name: 'burger-constructor',
    initialState: burgerConstructorOrderInitialState,
    reducers: {
        setOrderIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
        resetOrder: (state) => {
            state.ingredients = [];
            state.orderNumber = null;
        },
        setOrder: (state, action) => {
            state.orderNumber = action.payload;
        }
    },
});

export const { setOrderIngredients, resetOrder, setOrder } = BurgerConstructorOrderSlice.actions;
export default BurgerConstructorOrderSlice.reducer;