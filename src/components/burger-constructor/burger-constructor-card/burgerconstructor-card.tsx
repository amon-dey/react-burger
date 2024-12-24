import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItem from "../../../utils/types";
import styles from './styles.module.css';

type Props = {
    ingredient: ingredientItem,
    cardType?: "top" | "bottom" | undefined,
};

export const BurgerConstructorCard: FC<Props> = ({ ingredient: ingredient, cardType: cardType }) => {
    let bunLocationText: string = ingredient.name;
    const dragVisible = cardType === undefined ? styles.default : styles.hidden;
    const isLocked = cardType !== undefined ? true : undefined;
    if (cardType === "top") {
        bunLocationText += "\n(верх)";
    }
    if (cardType === "bottom") {
        bunLocationText += "\n(низ)";
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={cardType}
                text={bunLocationText}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
            />
        </li>
    );
};

export default BurgerConstructorCard;
