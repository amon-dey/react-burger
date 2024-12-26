import { createSlice } from '@reduxjs/toolkit';
import ingredientItem from '../../utils/types';
import { postOrder } from './../thunks/burgerconstructor';

type burgerConstructorOrderInitialStateType = {
    ingredients: ingredientItem[];
    orderNumber: number | null;
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
            postOrder(store.iningredients)
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