import { FC } from "react";
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from './styles.module.css';

const App: FC = () => {
  return (
    <>
      <AppHeader />
      {
        <ul className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ul>
      }
    </>
  );

};

export default App;