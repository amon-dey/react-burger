import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "../../../utils/types"

import styles from './styles.module.css';

type Props = {
    item: Ingredient,
    card_type: "top" | "bottom" | undefined,
}

export const BurgerConstructorCard: FC<Props> = (props: Props) => {
    return (
        <li className={`${styles.li} p-4 `}>
            <DragIcon type="primary" />
            <ConstructorElement
                type={props.card_type}
                text={props.item.name}
                thumbnail={props.item.image}
                price={props.item.price}
            />
        </li>
    )
}

export default BurgerConstructorCard
