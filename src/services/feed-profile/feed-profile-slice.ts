import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus, IFeed } from '../../utils/types'

export type TFeedStore = {
    status: WebsocketStatus;
    error: string | null;
    feed: IFeed;
}

export const initialState: TFeedStore = {
    status: WebsocketStatus.OFFLINE,
    error: null,
    feed: {
        status: false,
        orders: [],
        total: 0,
        totalToday: 0
    }
};

export const feedProfileSlice = createSlice({
    name: "feedprofile",
    initialState,
    reducers: {
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessage: (state, action: PayloadAction<IFeed>) => {
            let feedin = action.payload;
            feedin.orders.sort((a, b) => b.number - a.number);
            state.feed = feedin;
        }
    },
})

export const { wsClose, wsError, wsMessage, wsOpen } = feedProfileSlice.actions;

type TActionCreators = typeof feedProfileSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;