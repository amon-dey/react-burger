import { OrderInfoSlice } from './order-info';
import { getOrder } from '../thunks/thunks';
import { mockIFeedOrderInfo } from '../../utils/__mocks__/mockData';

describe('OrderInfoSlice', () => {
    describe('initial state', () => {
        it('должен инициализировать начальное состояние', () => {
            const initialState = OrderInfoSlice.getInitialState();
            expect(initialState).toEqual({
                fetchedOrder: null,
                orderIsLoading: false,
            });
        });
    });

    describe('extraReducers', () => {
        it('getOrder.pending должен устанавливать orderIsLoading в true', () => {
            const action = { type: getOrder.pending.type };
            const state = OrderInfoSlice.reducer(undefined, action);

            expect(state.orderIsLoading).toBe(true);
        });

        it('getOrder.fulfilled должен устанавливать fetchedOrder и сбрасывать orderIsLoading', () => {

            const action = { type: getOrder.fulfilled.type, payload: mockIFeedOrderInfo };
            const state = OrderInfoSlice.reducer(undefined, action);

            expect(state.orderIsLoading).toBe(false);
            expect(state.fetchedOrder).toEqual(mockIFeedOrderInfo.orders[0]);
        });

        it('getOrder.rejected должен сбрасывать orderIsLoading и fetchedOrder', () => {
            const action = { type: getOrder.rejected.type };
            const state = OrderInfoSlice.reducer(undefined, action);

            expect(state.orderIsLoading).toBe(false);
            expect(state.fetchedOrder).toBeNull();
        });
    });
});