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


// @ya.praktikum\react-developer-burger-ui-components\dist\ui\constructor-element.css
export const EmptyItem: FC<PropsEmpty> = ({ cardType: cardType }) => {

    let className = "constructor-element ml-4 text text_type_main-medium text_color_inactive";
    if (cardType === "top") {
        className += " constructor-element_pos_top";
    }
    if (cardType === "bottom") {
        className += " constructor-element_pos_bottom";
    }

    return (
        <li className={`${styles.li} p-4 `}>
            <div className={className}>
            <div className={styles.empty_list}>
                Перетащи сюда {!cardType ? "начинку или соус" : "Булку"}
                </div>
            </div>
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
