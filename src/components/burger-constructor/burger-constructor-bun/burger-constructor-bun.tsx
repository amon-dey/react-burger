import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { AppDispatch, RootState } from './../../../services/store';
import { useSelector, useDispatch } from 'react-redux';
import { BurgerConstructorCard } from "./../burger-constructor-card/burgerconstructor-card";
import { setBun } from "../../../services/burger-constructor/burger-constructor-ingredients";
import { ingredientItemTypes } from "./../../../utils/types"
import { EmptyItem } from "./../burger-constructor-emptycard/burger-constructor-emptycard";

import styles from './styles.module.css';

type Props = {
    cardType?: "top" | "bottom" | undefined,
};

export const BurgerConstructorBun: FC<Props> = ({ cardType: cardType }) => {
    const { bun } = useSelector((state: RootState) => state.burgerConstructorIngredients);
    const dispatch = useDispatch<AppDispatch>();

    const [isHover, drop] = useDrop({
        accept: ingredientItemTypes[0].type+"addingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(setBun(item));
        },
    });

    const hoverClass = isHover.isHover ? styles.ishover : '';

    return (
        <div ref={drop} className={hoverClass}>
            {
                bun ? <BurgerConstructorCard ingredient={bun} cardType={cardType} index={0}/> :
                    <EmptyItem cardType={cardType}></EmptyItem>
            }
        </div>
    );
};

export default BurgerConstructorBun;