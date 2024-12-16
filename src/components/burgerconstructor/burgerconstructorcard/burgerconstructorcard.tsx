import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientItem from "../../../utils/types"

import styles from './styles.module.css';

type Props = {
    item: ingredientItem,
    card_type?: "top" | "bottom" | undefined,
}

export const BurgerConstructorCard: FC<Props> = (props: Props) => {
    //let isLocked = false
    let text: string = props.item.name
    const dragVisible = props.card_type === undefined ? styles.default : styles.hidden;
    const isLocked = props.card_type !== undefined ? true : undefined
    if (props.card_type === "top") {
        text += "\n(верх)"
    }
    if (props.card_type === "bottom") {
        text += "\n(низ)"
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={props.card_type}
                text={text}
                thumbnail={props.item.image}
                price={props.item.price}
                isLocked={isLocked}
            />
        </li>
    )
}

export default BurgerConstructorCard
