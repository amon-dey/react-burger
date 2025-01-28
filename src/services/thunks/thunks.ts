import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  API_MAKE_ORDER, API_INGREDIENTS, API_REGISTER, API_LOGIN,
  API_LOGOUT, API_FORGOTPASSWORD, API_RESETPASSWORD
} from '../../utils/constants';

import IngredientItemType from '../../utils/types';
import { request, fetchWithRefresh } from '../utils';

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

export const postRegister = createAsyncThunk(
  `user/register`,
  async (data: {
    email: string,
    password: string,
    name: string
  }) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify(data),
    };
    return await request(API_REGISTER, options);
  }
);

export const login = createAsyncThunk(
  `api/login`,
  async (data: {
    email: string,
    password: string,
  }) => {
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

export const forgotPassword = createAsyncThunk(
  `api/forgot-password`,
  async (email: string) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", }, body: JSON.stringify({ email: email }),
    };
    return await request(API_FORGOTPASSWORD, options);
  }
);

export const resetPassword = createAsyncThunk(
  `api/reset-password`,
  async (data: { password: string, token: string }) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify(data),
    };
    return await fetchWithRefresh(API_RESETPASSWORD, options);
  }
);

export const checkUserAuth = createAsyncThunk(
  `api/checkUserAuth`,
  async () => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
    };
    return await fetchWithRefresh(API_RESETPASSWORD, options);
  }
);