import { FC } from 'react';
import ingredientItem from "./../../../utils/types";
import { NutritionValue } from "./nutrition-value/nutrition-value";

import styles from "./styles.module.css";

type Props = {
    ingredient: ingredientItem,
};

export const IngredientDetails: FC<Props> = ({ ingredient: ingredient }) => {
    return (
        <section className={styles.block}>
            <span className={styles.img}>
                <img src={ingredient.image_large} alt={ingredient.name} ></img>
            </span>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{ingredient.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={ingredient.calories} />
                <NutritionValue name="Белки, г" val={ingredient.proteins} />
                <NutritionValue name="Жиры, г" val={ingredient.fat} />
                <NutritionValue name="Углеводы, г" val={ingredient.carbohydrates} />
            </ul>
        </section>
    );
};
export default IngredientDetails;