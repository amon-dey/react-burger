import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_INGREDIENTS } from '../../utils/constants';
import ingredientItem from '../../utils/types';
import { request } from '../utils';

export const fetchIngredients = createAsyncThunk<{ data: ingredientItem[]; }>(
  `burger-ingredients/fetch`,
  async () => {
    const options = { method: 'GET' };
    return await request(URL_INGREDIENTS, options);
  }
);