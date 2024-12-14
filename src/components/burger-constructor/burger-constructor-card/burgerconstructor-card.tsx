import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientItem from "../../../utils/types"

import styles from './styles.module.css';

type Props = {
    item: ingredientItem,
    cardType?: "top" | "bottom" | undefined,
}

export const BurgerConstructorCard: FC<Props> = (props: Props) => {
    //let isLocked = false
    let text: string = props.item.name
    const dragVisible = props.cardType === undefined ? styles.default : styles.hidden;
    const isLocked = props.cardType !== undefined ? true : undefined
    if (props.cardType === "top") {
        text += "\n(верх)"
    }
    if (props.cardType === "bottom") {
        text += "\n(низ)"
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={props.cardType}
                text={text}
                thumbnail={props.item.image}
                price={props.item.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
            />
        </li>
    )
}

export default BurgerConstructorCard
