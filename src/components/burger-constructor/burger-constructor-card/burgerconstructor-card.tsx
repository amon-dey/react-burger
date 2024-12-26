import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItem } from "../../../utils/types";
import styles from './styles.module.css';
import { removeIngredient } from "../../../services/burger-constructor/constructor-ingredients";
import { useDispatch } from 'react-redux';
import { AppDispatch } from './../../../services/store';

type Props = {
    ingredient: ingredientItem | null,
    cardType?: "top" | "bottom" | undefined,
};

type PropsEmpty = {
    cardType?: "top" | "bottom" | undefined,
    text: string;
};

export const EmptyItem: FC<PropsEmpty> = ({ cardType: cardType, text: text }) => {
    return (
        <li className={`${styles.li} p-4 `}>
            <ConstructorElement
                type={cardType}
                text={text}
                thumbnail=''
                price={0}
                isLocked={true}
                extraClass=''
            />
        </li>
    );
};

export const BurgerConstructorCard: FC<Props> = ({ ingredient: ingredient, cardType: cardType }) => {
    const dispatch = useDispatch<AppDispatch>();

    let bunLocationText: string = ingredient !== null ? ingredient.name : "";

    const dragVisible = cardType === undefined ? styles.default : styles.hidden;
    const isLocked = cardType !== undefined ? true : undefined;
    if (cardType === "top") {
        bunLocationText += "\n(верх)";
    }
    if (cardType === "bottom") {
        bunLocationText += "\n(низ)";
    }

    if (ingredient === null) {
        return (
            <EmptyItem cardType={cardType} text={bunLocationText}></EmptyItem>
        );
    }

    const handleClose = () => {
        dispatch(removeIngredient(ingredient));
    };

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
                handleClose={handleClose}
            />
        </li>
    );
};

export default BurgerConstructorCard;
