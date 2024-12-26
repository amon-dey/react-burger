import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_ORDER } from '../../utils/constants';
import ingredientItem from '../../utils/types';
import { request } from '../utils';

export const postOrder = createAsyncThunk(
  `burger-constructor/order`,
  async (data: ingredientItem[] ) => {
    const idList: string[] = data.map(item => item._id);
 
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

/* Эндпоинт
// POST https://norma.nomoreparties.space/api/orders

 Тело запроса
{ 
    "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
} 
*/
