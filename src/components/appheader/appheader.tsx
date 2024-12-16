import { FC } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { AppHeaderButton } from "./appheaderbutton/appheaderbutton"
import { AppHeaderBlock } from "./appheaderblock/appheaderblock"

import styles from './styles.module.css';

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <AppHeaderBlock>
        <AppHeaderButton textStyle='text text_type_main-default'>
          <BurgerIcon type="primary" />
          Конструктор
        </AppHeaderButton>
        <AppHeaderButton textStyle='text text_type_main-default text_color_inactive'>
          <ListIcon type="primary" />
          Лента заказов
        </AppHeaderButton>
      </AppHeaderBlock>
      <AppHeaderBlock>
        <Logo />
      </AppHeaderBlock>
      <AppHeaderBlock>
        <AppHeaderButton textStyle='text text_type_main-default text_color_inactive'>
          <ProfileIcon type="primary" />
          Личный кабинет</AppHeaderButton>
      </AppHeaderBlock>
    </header >
  )
}

export default AppHeader
