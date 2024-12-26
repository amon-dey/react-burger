import { createSlice } from '@reduxjs/toolkit';
import ingredientItem from '../../utils/types';
import { postOrder } from '../thunks/burgerconstructor';

type burgerConstructorOrderInitialStateType = {
    ingredintIdList: ingredientItem[];
    orderNumber: number | null;
    orederBurgerName: string;
    isError: boolean;
    isLoading: boolean;
};

const burgerConstructorOrderInitialState: burgerConstructorOrderInitialStateType = {
    ingredintIdList: [],
    orderNumber: null,
    orederBurgerName: "",
    isError: false,
    isLoading: false
};

export const BurgerConstructorOrderSlice = createSlice({
    name: 'burger-constructor',
    initialState: burgerConstructorOrderInitialState,
    reducers: {
        setOrderIngredients: (state, action) => {
            state.ingredintIdList = action.payload;
            //const data = action.payload as ingredientItem[];
            //state.ingredintIdList = data.map(item => item._id);
        },
        resetOrder: (state) => {
            state.ingredintIdList = [];
            state.orderNumber = null;
            state.orederBurgerName = "";
        },
        setOrder: (state, action) => {
            state.orderNumber = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                if (action.payload) {
                    if (action.payload.success) {
                        state.orderNumber = action.payload.order.number;
                        state.orederBurgerName = action.payload.name;
                        state.isError = false;
                    }
                }
            })
            .addCase(postOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});
export const { setOrderIngredients, resetOrder, setOrder } = BurgerConstructorOrderSlice.actions;
export default BurgerConstructorOrderSlice.reducer;