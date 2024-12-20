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

//const URL = "/api/"

const App: FC = () => {
  const [data, setData] = useState<ingredientItem[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(
    {
      isError: false,
      text: ""
    }
  );

  //  TODO: чудо юдо, надо упростить
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (response.status !== 200) {
          setIsError({ isError: true, text: "ответ сервера " + response.status.toLocaleString() })
        }

        const data = await response.json();

        try {
          const items: ingredientItem[] = data.data as ingredientItem[]
          if (!Array.isArray(items)) {
            console.error('Ошибка: данные не являются массивом');
            setIsError({ isError: true, text: "сервер вернул не корректные данные" })
            return;
          }

          items.forEach((item) => {
            if (item._id && item.name && item.type && item.price) {
              ;
            } else {
              console.error('Ошибка: элемент массива не соответствует типу');
              setIsError({ isError: true, text: "сервер вернул не корректные данные" })
              return;
            }
          });

          setData(items)
        }
        catch {
          setIsError({ isError: true, text: "сервер вернул не корректные данные" })
        }
      }
      catch {
        //используем локальные данные в случае не доступности, у меня интернет редкий зверь
        //setIsError({ isError: true, text: "сервер не доступен" })
        setData(burgerData)
      }
      finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  if (isError.isError) {
    return <p className={`${styles.isloading} text text_type_main-large m-10`}>
      <InfoIcon type="error" className={styles.icon} />
      Печалька, ингредиенты не загрузились
      {isError.text !== "" ? ":" + isError.text : ""}
    </p>;
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
