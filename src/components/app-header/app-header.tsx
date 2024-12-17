import { FC } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { AppHeaderLink } from "./app-header-link/app-header-link"
import { AppHeaderBlock } from "./app-header-block/app-header-block"

import styles from './styles.module.css';

const AppHeader: FC = () => {
  return (
    <nav>
      <header className={styles.header}>
        <AppHeaderBlock>
          <AppHeaderLink active={true} icon={BurgerIcon} text="Конструктор"/>
          <AppHeaderLink active={false} icon={ListIcon} text="Лента заказов"/>
        </AppHeaderBlock>
        <AppHeaderBlock>
          <Logo />
        </AppHeaderBlock>
        <AppHeaderBlock>
          <AppHeaderLink active={false} icon={ProfileIcon} text="Личный кабинет"/>
        </AppHeaderBlock>
      </header >
    </nav>
  )
}

export default AppHeader
