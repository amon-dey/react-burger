import { FC } from 'react';
import { AppDispatch, RootState } from './../../../services/store';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { BurgerConstructorCard } from "./../burger-constructor-card/burgerconstructor-card";
import { addIngredient } from "../../../services/burger-constructor/constructor-ingredients";

import styles from './styles.module.css';

export const BurgerConstructorIngredients: FC = () => {
    const { ingredients } = useSelector((state: RootState) => state.burgerConstructorIngredients);
    const dispatch = useDispatch<AppDispatch>();

    const [isHover, drop] = useDrop({
        accept: ["sauce", "main"],
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addIngredient(item));
        },
    });

    const hoverClass = isHover.isHover ? styles.ishover : '';

    const emptyList = () => {
        return (
            <div className={hoverClass}>
                <BurgerConstructorCard ingredient={null} key={0} />
            </div>
        );
    };

    const existList = () => {
        return (
            ingredients.map((ingredient) =>
                <div className={hoverClass} key={ingredient.uuid}>
                    <BurgerConstructorCard ingredient={ingredient} />
                </div>
            )
        );
    };

    return (
        <div ref={drop}>
            {
                ingredients.length > 0 ? existList() : emptyList()
            }
        </div>
    );
};

export default BurgerConstructorIngredients;
