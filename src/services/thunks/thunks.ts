import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_MAKE_ORDER, API_INGREDIENTS, API_REGISTER, API_LOGIN, API_LOGOUT } from '../../utils/constants';
import IngredientItemType from '../../utils/types';
import { request, api } from '../utils';
import { setIsAuthChecked, setUser } from "./../user/slice";

type RegisterPostType = {
  email: string,
  password: string,
  name: string
}

type LoginPostType = {
  email: string,
  password: string,
}

export const postOrder = createAsyncThunk(
  `burger-constructor/order`,
  async (data: IngredientItemType[]) => {
    const data1 = data as unknown as IngredientItemType[];
    const idList: string[] = data1.map(item => item._id);
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
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

export const postRegister = createAsyncThunk<any, RegisterPostType>(
  `user/register`,
  async (data: RegisterPostType) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify(data),
    };
    return await request(API_REGISTER, options);
  }
);

export const login = createAsyncThunk<any, LoginPostType>(
  `api/login`,
  async (data: LoginPostType) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", }, body: JSON.stringify(data),
    };
    return await request(API_LOGIN, options);
  }
);

export const logout = createAsyncThunk(
  `api/logout`,
  async () => {
    const token = localStorage.getItem("refreshToken")
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", }, body: JSON.stringify({ token: token }),
    };
    return await request(API_LOGOUT, options);
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