import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedOrderInfo, IOrderFeed } from '../../utils/types';
import { getOrder } from '../thunks/thunks';

type TOrderInfo = {
    fetchedOrder: IOrderFeed | null
    orderIsLoading: boolean
};

export const initialState: TOrderInfo = {
    fetchedOrder: null,
    orderIsLoading: false,
};

export const OrderInfoSlice = createSlice({
    name: 'order-info',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.orderIsLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action: PayloadAction<IFeedOrderInfo>) => {
                state.orderIsLoading = false
                state.fetchedOrder = action.payload.orders[0];
            })
            .addCase(getOrder.rejected, (state) => {
                state.orderIsLoading = false
                state.fetchedOrder = null;
            });
    }
});

export default OrderInfoSlice.reducer;
