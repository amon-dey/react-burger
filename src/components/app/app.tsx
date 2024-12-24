import { useEffect, FC } from "react";
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { fetchIngredients } from "../../services/thunks/burgeringredients";

import styles from './styles.module.css';
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from './../../services/store';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isError = useSelector((state: RootState) => state.burgerIngredients.isError);
  const isLoading = useSelector((state: RootState) => state.burgerIngredients.isLoading);
  const ingredients = useSelector((state: RootState) => state.burgerIngredients.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
    console.log("fetch")
  }, [dispatch]);


  if (isError) {
    return <p className={`${styles.isloading} text text_type_main-large m-10`}>
      <InfoIcon type="error" className={styles.icon} />
      Печалька, ингредиенты не загрузились
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
        ingredients.length > 0 &&
        <ul className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </ul>
      }
    </>
  );

};

export default App;

/*
  return (
    <>
      <AppHeader />
      {
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
        ingredients !== undefined && !isLoading &&
        <ul className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </ul>
      }
    </>
  );


  
*/
