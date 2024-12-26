import { createSlice } from '@reduxjs/toolkit';
import ingredientItem from '../../utils/types';

type burgerConstructorOrderInitialStateType = {
    ingredintIdList: string[];
    orderNumber: number | null;
};

const burgerConstructorOrderInitialState: burgerConstructorOrderInitialStateType = {
    ingredintIdList: [],
    orderNumber: null
};

export const BurgerConstructorOrderSlice = createSlice({

    name: 'burger-constructor',
    initialState: burgerConstructorOrderInitialState,
    reducers: {
        setOrderIngredients: (state, action) => {
            const data = action.payload as ingredientItem[];
            state.ingredintIdList = data.map(item => item._id);
        },
        resetOrder: (state) => {
            state.ingredintIdList = [];
            state.orderNumber = null;
        },
        setOrder: (state, action) => {
            state.orderNumber = action.payload;
        }
    },
});
export const { setOrderIngredients, resetOrder, setOrder } = BurgerConstructorOrderSlice.actions;
export default BurgerConstructorOrderSlice.reducer;