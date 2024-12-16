import AppHeader from "../appheader/appheader"
import BurgerIngredients from "../burgeringredients/burgeringredients"
import BurgerConstructor from "../burgerconstructor/burgerconstructor"
import { FC } from 'react';

import styles from './app.module.css'
import burgerData from '../../utils/data.json'
import AppCard from "../appcard/appcard"

const App: FC = () => {
  return (
    <>
      <nav>
        <AppHeader />
      </nav>
      <main className={styles.main}>
        <AppCard>
          <BurgerIngredients data={burgerData} />
        </AppCard>
        <span className="m-10" />
        <AppCard>
          <BurgerConstructor data={burgerData} />
        </AppCard>
      </main>
    </>
  )
}

export default App
