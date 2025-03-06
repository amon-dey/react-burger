import { OrderInfoSlice, initialState } from './order-info';
import { getOrder } from '../thunks/thunks';

import { mockCreateOrderPayload } from './../../utils/__mocks__/mockData'

describe('OrderInfoSlice Reducer', () => {

    it('initial state', () => {
        const action = { type: 'unknown' };
        const state = OrderInfoSlice.reducer(undefined, action);

        expect(state).toEqual(initialState);
    });

    it('getOrder.pending', () => {
        const action = { type: getOrder.pending.type };
        const state = OrderInfoSlice.reducer(initialState, action);

        expect(state.orderIsLoading).toBe(true);
        expect(state.fetchedOrder).toBeNull();
    });

    it('getOrder.fulfilled', () => {
        const action = { type: getOrder.fulfilled.type, payload: mockCreateOrderPayload };
        const state = OrderInfoSlice.reducer(initialState, action);

        expect(state.orderIsLoading).toBe(false);
        expect(state.fetchedOrder).toEqual(mockCreateOrderPayload);
    });

    it('getOrder.rejected', () => {
        const action = { type: getOrder.rejected.type };
        const state = OrderInfoSlice.reducer(initialState, action);

        expect(state.orderIsLoading).toBe(false);
        expect(state.fetchedOrder).toBeNull();
    });
});