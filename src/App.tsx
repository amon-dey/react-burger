import AppHeader from "./components/appheader"
import BurgerIngredients from "./components/burgeringredients"
import BurgerConstructor from "./components/burgerconstructor"
import { FC } from 'react';

import styles from './app.module.css'
import "./App.css"
import burgerData from './utils/data.json'
import AppCard from "./components/appcard"


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
