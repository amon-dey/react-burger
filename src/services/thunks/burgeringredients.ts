import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_INGREDIENTS } from '../../utils/constants';
import ingredientItem from '../../utils/types';
import { request } from '../utils';

export const fetchIngredients = createAsyncThunk<{ data: ingredientItem[] }>(
  `burger-ingredients`,
  async () => {
    return await request(URL_INGREDIENTS);
  }
);