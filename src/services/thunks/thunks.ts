import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_MAKE_ORDER, URL_INGREDIENTS } from '../../utils/constants';
import ingredientItem from '../../utils/types';
import { request } from '../utils';

export const postOrder = createAsyncThunk(
  `burger-constructor/order`,
  async (data: ingredientItem[]) => {
    const data1 = data as unknown as ingredientItem[];
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

    return await request(URL_MAKE_ORDER, options);
  }
);

export const fetchIngredients = createAsyncThunk<{ data: ingredientItem[]; }>(
  `burger-ingredients/fetch`,
  async () => {
    const options = { method: 'GET' };
    return await request(URL_INGREDIENTS, options);
  }
);