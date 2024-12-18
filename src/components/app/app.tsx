import AppHeader from "../app-header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"

import { FC } from 'react';

import styles from './styles.module.css'
import burgerData from '../../utils/data.json'

const App: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={burgerData} />
        <BurgerConstructor data={burgerData} />
      </main>
    </>
  )
}

export default App
