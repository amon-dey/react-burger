import { FC } from 'react';
import ingredientItem from "./../../utils/types"
import { NutritionValue } from "./nutrition-value/nutrition-value"

import styles from "./styles.module.css"

type Props = {
    item: ingredientItem,
}

export const IngredientDetails:FC<Props> = ({item}) => {
    return (
        <section className={styles.block}>
            <span className={styles.img}>
                <img src={item.image_large} alt={item.name} ></img>
            </span>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{item.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={item.calories} />
                <NutritionValue name="Белки, г" val={item.proteins} />
                <NutritionValue name="Жиры, г" val={item.fat} />
                <NutritionValue name="Углеводы, г" val={item.carbohydrates} />
            </ul>
        </section>
    )
}
export default IngredientDetails