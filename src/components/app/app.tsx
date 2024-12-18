import { useState, useEffect } from "react";
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from "../app-header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import { ingredientItem } from "../../utils/types"

import { FC } from 'react';

import styles from './styles.module.css'
import burgerData from '../../utils/data.json'

const URL = "https://norma.nomoreparties.space/api/ingredients"

const App: FC = () => {
  const [data, setData] = useState<ingredientItem[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setData(data.data);
        setIsLoading(false);
      } catch (error) {
        setData(burgerData)
        setIsLoading(false);
        setIsError(true)
        console.error('Ошибка загрузки списка ингредиентов', error);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return <p className={`${styles.isloading} text text_type_main-large m-10`}>
      <InfoIcon type="error" className={styles.icon} />
      Печалька, ингридиенты не загрузились</p>;
  }

  if (isLoading) {
    return <p className={`${styles.isloading} text text_type_main-large`}>
      Загрузка списка ингредиентов...</p>;
  }

  return (
    <>
      <AppHeader />
      {
        data !== undefined && !isLoading &&
        <ul className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </ul>
      }
    </>
  )
}

export default App
