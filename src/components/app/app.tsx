import AppHeader from "../appheader/appheader"
import BurgerIngredients from "../burgeringredients/burgeringredients"
import BurgerConstructor from "../burgerconstructor/burgerconstructor"
import { FC } from 'react';

import styles from './app.module.css'
import burgerData from '../../utils/data.json'
//import AppCard from "../appcard/appcard"

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
