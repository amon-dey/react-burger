import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_MAKE_ORDER, API_INGREDIENTS } from '../../utils/constants';
import IngredientItemType from '../../utils/types';
import { request, api } from '../utils';
import {setIsAuthChecked, setUser} from "./../user/slice";

export const postOrder = createAsyncThunk(
  `burger-constructor/order`,
  async (data: IngredientItemType[]) => {
    const data1 = data as unknown as IngredientItemType[];
    const idList: string[] = data1.map(item => item._id);

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: idList,
      }),
    };

    return await request(API_MAKE_ORDER, options);
  }
);

export const fetchIngredients = createAsyncThunk<{ data: IngredientItemType[]; }>(
  `burger-ingredients/fetch`,
  async () => {
    const options = { method: 'GET' };
    return await request(API_INGREDIENTS, options);
  }
);

export const login = createAsyncThunk(
    "user/login",
    async () => {
        return api.login();
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        return api.logout();
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, { dispatch }) => {
        if (localStorage.getItem("accessToken")) {
            api.getUser()
                .then(user => dispatch(setUser(user)))
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
)