import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientItem from "../../../utils/types"
import styles from './styles.module.css';

type Props = {
    item: ingredientItem,
    cardType?: "top" | "bottom" | undefined,
}

export const BurgerConstructorCard: FC<Props> = (props: Props) => {
    let bunLocationText: string = props.item.name;
    const dragVisible = props.cardType === undefined ? styles.default : styles.hidden;
    const isLocked = props.cardType !== undefined ? true : undefined;
    if (props.cardType === "top") {
        bunLocationText += "\n(верх)";
    }
    if (props.cardType === "bottom") {
        bunLocationText += "\n(низ)";
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={props.cardType}
                text={bunLocationText}
                thumbnail={props.item.image}
                price={props.item.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
            />
        </li>
    )
}

export default BurgerConstructorCard
