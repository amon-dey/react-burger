import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_ORDER } from '../../utils/constants';
import ingredientItem from '../../utils/types';
import { request } from '../utils';

export const postOrder = createAsyncThunk(
  `burger-constructor/order`,
  async (data: ingredientItem[] ) => {
    const data1 = data as unknown as ingredientItem[]
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

    return await request(URL_ORDER, options);
  }
);