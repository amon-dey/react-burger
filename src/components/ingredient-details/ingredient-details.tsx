import ingredientItem from "./../../utils/types"
import { NutritionValue } from "./nutrition-value/nutrition-value"
type Props = {
    item: ingredientItem
}

import styles from "./styles.module.css"

export const IngredientDetails = (props: Props) => {
    return (
        <section className={styles.block}>
            <span className={styles.img}>
                <img src={props.item.image_large} alt={props.item.name} ></img>
            </span>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{props.item.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={props.item.calories} />
                <NutritionValue name="Белки, г" val={props.item.proteins} />
                <NutritionValue name="Жиры, г" val={props.item.fat} />
                <NutritionValue name="Углеводы, г" val={props.item.carbohydrates} />
            </ul>
        </section>
    )
}
export default IngredientDetails