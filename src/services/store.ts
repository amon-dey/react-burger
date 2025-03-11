import { configureStore } from '@reduxjs/toolkit';
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

import { combineReducers } from 'redux';
import { BurgerIngredientsSlice } from './burger-ingredients/burger-ingredients-ingrediets';
import { currentActiveTabSlice } from './burger-ingredients/burger-ingredients-current-activetab.ts';
import { selectedIngredientSlice } from './burger-ingredients/burger-ingredients-selected-ingredient';
import { BurgerConstructorSlice } from './burger-constructor/burger-constructor-ingredients';
import { BurgerConstructorOrderSlice } from './burger-constructor/burger-constructor-order';
import { OrderInfoSlice } from './order-info/order-info'

import { feedSlice, wsClose, wsError, wsMessage, wsOpen } from './feed/feed-slice';
import { feedProfileSlice, wsClose as wsCloseProfile, wsError as wsErrorProfile, wsMessage as wsMessageProfile, wsOpen as wsOpenProfile } from './feed-profile/feed-profile-slice';

import { wsConnect, wsDisconnect } from "./feed/actions";
import { socketMiddleware } from './middleware/socket-middleware';

import { userSlice } from './user/user.ts'

const feedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
}, false);

const feedMiddlewareProfile = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onOpen: wsOpenProfile,
    onClose: wsCloseProfile,
    onError: wsErrorProfile,
    onMessage: wsMessageProfile,
}, true);

export const rootReducer = combineReducers({
    burgerIngredientsIngredient: BurgerIngredientsSlice.reducer,
    burgerIngredientsCurrentActiveTab: currentActiveTabSlice.reducer,
    burgerIngredientsSelectedIngredient: selectedIngredientSlice.reducer,
    burgerConstructorIngredients: BurgerConstructorSlice.reducer,
    BurgerConstructorOrder: BurgerConstructorOrderSlice.reducer,
    OrderInfo: OrderInfoSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    Feed: feedSlice.reducer,
    FeedProfile: feedProfileSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidlewares) => {
        return getDefaultMidlewares().concat(feedMiddleware, feedMiddlewareProfile);
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();