import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { wsConnect } from "../feed/actions";
import { IFeed, IngredientItemType } from "../../utils/types";

export type TWsActionTypes<R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
}

const RECONNECT_PERIOD = 3000;

function getIngredientsByIds(list1: string[], list2: Array<IngredientItemType> | null): Array<IngredientItemType> {
    const result: Array<IngredientItemType> = [];
    if (list2 === null) {
        return result
    }
    const ingredientMap = new Map<string, IngredientItemType>();

    list2.forEach(item => {
        ingredientMap.set(item._id, item);
    });

    list1.forEach(id => {
        if (ingredientMap.has(id)) {
            result.push(ingredientMap.get(id)!);
        }
    });

    return result;
}


export const socketMiddleware = <R>(
    wsActions: TWsActionTypes<R>,
    withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            onOpen,
            onClose,
            onError,
            onMessage,
        } = wsActions;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";

        return (next) => (action) => {
            const { dispatch } = store;

            if (connect.match(action)) {
                url = action.payload;
                socket = new WebSocket(action.payload);
                isConnected = true;

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                };

                socket.onerror = () => {
                    dispatch(onError("Error"));
                };

                socket.onmessage = (event) => {
                    const { data } = event;

                    try {
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            //     refreshToken()
                            //        .then(refreshData => {
                            //           const wssUrl = new URL(url);
                            //           wssUrl.searchParams.set(
                            //             "token",
                            //             refreshData.accessToken.replace("Bearer ", "")
                            //           );
                            //           dispatch(connect(wssUrl.toString()));
                            //        })
                            //        .catch(err => {
                            //          dispatch(onError((err as Error).message));
                            //        });

                            //     dispatch(disconnect());

                            //     return;
                        }
                        const state = store.getState()
                        const ingredients = state.burgerIngredientsIngredient.ingredients;
                        const source = parsedData as IFeed;
                        source.orders.forEach(element => {
                            element.ingredientsFull = getIngredientsByIds(element.ingredients, ingredients)
                        });
                        // console.log(ingredients)
                        // console.log(source)
                        dispatch(onMessage(parsedData));
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }
                };

                socket.onclose = () => {
                    onClose && dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, RECONNECT_PERIOD);
                    }
                };
            }

            if (socket && disconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}