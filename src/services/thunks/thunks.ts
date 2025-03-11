import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserPayload, ICreateOrderPaylod, IFeedOrderInfo, ApiResponseError, IPostOrder, PayloadIngedients } from './../../utils/types'

import {
  API_MAKE_ORDER, API_INGREDIENTS, API_REGISTER, API_LOGIN,
  API_LOGOUT, API_FORGOTPASSWORD, API_RESETPASSWORD,
  API_USER, API_ORDER
} from '../../utils/constants';

import { request, fetchWithRefresh } from '../utils';

export const postOrder = createAsyncThunk<
  ICreateOrderPaylod,
  { order: IPostOrder }
>(
  `burger-constructor/order`,
  async (order) => {
    //const idList: string[] = data.map(item => item._id);
    const token = localStorage.getItem("accessToken");
    const options = {
      method: 'POST', headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": token ? token : "",
      },
      body: JSON.stringify(order.order),
    };
    return await fetchWithRefresh(API_MAKE_ORDER, options);
  }
);

export const getOrder = createAsyncThunk<
  IFeedOrderInfo,
  { number: string }
>(
  `order-info/fetch`,
  async (number) => {
    const options = { method: 'GET' };
    return await request(API_ORDER + number.number, options);
  }
);

export const fetchIngredients = createAsyncThunk<PayloadIngedients>(
  `burger-ingredients/fetch`,
  async () => {
    const options = { method: 'GET' };
    return await request(API_INGREDIENTS, options);
  }
);

export const postRegister = createAsyncThunk<
  IUserPayload,
  { email: string; password: string; name: string },
  { rejectValue: string }
>(
  "user/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ email, password, name }),
      };

      const response = await request<IUserPayload>(API_REGISTER, options);
      return response;
    } catch (error) {
      if (error instanceof Object) {
        const err = error as ApiResponseError;
        return rejectWithValue(err.message || "Не известная ошибка");
      }
      return rejectWithValue("Не известная ошибка");
    }
  }
);

export const login = createAsyncThunk<
  IUserPayload,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ email, password }),
      };

      const response = await request<IUserPayload>(API_LOGIN, options);
      return response;
    } catch (error) {
      if (error instanceof Object) {
        const err = error as ApiResponseError;
        return rejectWithValue(err.message || "Не известная ошибка");
      }
      return rejectWithValue("Не известная ошибка");
    }
  }
);

export const logout = createAsyncThunk(
  `api/logout`,
  async () => {
    const token = localStorage.getItem("refreshToken")
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify({ token: token }),
    };
    return await request(API_LOGOUT, options);
  }
);

export const forgotPassword = createAsyncThunk(
  `api/forgot-password`,
  async (email: string) => {
    const options = {
      method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify({ email: email }),
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
    return await request(API_RESETPASSWORD, options);
  }
);

export const userGetInfo = createAsyncThunk<
  IUserPayload,
  void,
  { rejectValue: string }
>(
  "user/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token || "",
        },
      };

      const response = await fetchWithRefresh<IUserPayload>(API_USER, options);
      return response;
    } catch (error) {
      if (error instanceof Object) {
        const err = error as ApiResponseError;
        return rejectWithValue(err.message || "Не известная ошибка");
      }
      return rejectWithValue("Не известная ошибка");
    }
  }
);

export const userSetInfo = createAsyncThunk<
  IUserPayload,
  { email: string; password: string; name: string },
  { rejectValue: string }
>(
  "user/setInfo",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token || "",
        },
        body: JSON.stringify({ email, password, name }),
      };

      const response = await request<IUserPayload>(API_USER, options);
      return response;
    } catch (error) {
      if (error instanceof Object) {
        const err = error as ApiResponseError;
        return rejectWithValue(err.message || "Не известная ошибка");
      }
      return rejectWithValue("Не известная ошибка");
    }
  }
);