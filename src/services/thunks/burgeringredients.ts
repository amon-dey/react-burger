import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_INGREDIENTS } from '../../utils/constants';
import ingredientItem from '../../utils/types';

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  return await res.json().then(() => Promise.reject("Ошибка"));
};

export const request = async (url: string) => {
  return await fetch(url).then(checkResponse);
};

export const fetchIngredients = createAsyncThunk<{ data: ingredientItem[] }>(
  `burgeringredients`,
  async () => {
    return await request(URL_INGREDIENTS);
  }
);

/*
export const fetchIngredients = createAsyncThunk<
 Promise<{ data: any }>,
 null,
 { state: RootState; dispatch: AppDispatch }
>('ingredients/fetchIngredients', async (_, { dispatch, state }) => {
 const response = await fetch(URL_INGREDIENTS);
 const data = await response.json();
 return data;
});

*/
export const fetchIngredients1 = createAsyncThunk("slice/type", async () => {
  try {
    const response = await fetch(URL_INGREDIENTS);
    if (!response.ok) {
      Promise.reject(response)
    }
    const data = await response.json();
    try {
      const items: ingredientItem[] = data.data as ingredientItem[];
      return items;
    } catch {
      Promise.reject();
    }

  } catch {
    Promise.reject();
  }
});
