import { FC } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { AppHeaderButton } from "./appheaderbutton/appheaderbutton"
import { AppHeaderBlock } from "./appheaderblock/appheaderblock"

import styles from './styles.module.css';

const AppHeader: FC = () => {
  return (
    <nav>
      <header className={styles.header}>
        <AppHeaderBlock>
          <AppHeaderButton active={true} icon={BurgerIcon} text="Конструктор"/>
          <AppHeaderButton active={false} icon={ListIcon} text="Лента заказов"/>
        </AppHeaderBlock>
        <AppHeaderBlock>
          <Logo />
        </AppHeaderBlock>
        <AppHeaderBlock>
          <AppHeaderButton active={false} icon={ProfileIcon} text="Личный кабинет"/>
        </AppHeaderBlock>
      </header >
    </nav>
  )
}

export default AppHeader
