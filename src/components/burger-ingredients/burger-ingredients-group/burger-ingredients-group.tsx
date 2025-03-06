import { forwardRef, memo } from 'react';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { IngredientItemType, ingredientItemTypes } from "../../../utils/types";

import styles from './styles.module.css';

type Props = {
    group: string;
    ingredients: IngredientItemType[];
};

const translateIngridentType = (dataname: string): string => {
    const foundItem = ingredientItemTypes.find(item => item.type === dataname);
    return foundItem ? foundItem.translated_name : "не известный тип";
};

export const BurgerIngredientsGroup = forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div ref={ref}>
            <p className="text text_type_main-large mb-6" >
                {translateIngridentType(props.group)}
            </p>
            <ul className={styles.ul}>
                {props.ingredients.map((ingredient) => (
                    <li key={ingredient._id} className='li'>
                        <BurgerIngredientsItem ingredient={ingredient} />
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default memo(BurgerIngredientsGroup);