import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from './../../../services/store';
import { BurgerConstructorCard } from "./../burger-constructor-card/burgerconstructor-card";
import { addIngredient } from "../../../services/burger-constructor/burger-constructor-ingredients";
import { ingredientItemTypes, IngredientItemType } from "./../../../utils/types";
import { EmptyItem } from "./../burger-constructor-emptycard/burger-constructor-emptycard";
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css';

export const BurgerConstructorIngredients: FC = () => {
    const { ingredients } = useSelector((state) => state.burgerConstructorIngredients);
    const dispatch = useDispatch();

    const dropIngredientTypes = useMemo(() => {
        return ingredientItemTypes.filter((item) => item.type !== ingredientItemTypes[0].type).map((item) => item.type + "addingredient");
    }, []);

    //ingredientItemTypes[0].type

    const [isHover, drop] = useDrop({
        accept: dropIngredientTypes,
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(doppeditem) {
            const { item } = doppeditem as { item: IngredientItemType };
            const doppedIngredient = {
                ...item,
                uuid: uuidv4()} as IngredientItemType;
            dispatch(addIngredient(doppedIngredient));
        },
    });

    const hoverClass = isHover.isHover ? styles.ishover : '';

    const existIngreidentsList = () => {
        return (
            ingredients.map((ingredient, index) =>
                <div className={hoverClass} key={ingredient.uuid}>
                    <BurgerConstructorCard ingredient={ingredient} index={index} />
                </div>
            )
        );
    };

    return (
        <div ref={drop} className={styles.ul}>
            {
                ingredients.length > 0 ? existIngreidentsList() : <div className={hoverClass} key="1"><EmptyItem /></div>
            }
        </div>
    );
};

export default BurgerConstructorIngredients;
