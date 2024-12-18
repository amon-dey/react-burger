import ingredientItem from "./../../utils/types"

type Props = {
    item: ingredientItem
}

import styles from "./styles.module.css"

type nutritionValueProps = {
    name: string
    val: number
}

const formatNutrition = (val: number): string => {
    let valFloat = (val / 10).toString().replace(".", ",")
    if (!valFloat.includes(',')) {
        valFloat += ",0"
    }
    return valFloat
}

const NutritionValue = (props: nutritionValueProps) => {
    return (
        <p className={`${styles.block} mr-5`}>
            {props.name}
            <span className="text_type_digits-default mt-2">
                {formatNutrition(props.val)}
            </span>
        </p>
    )
}

export const IngredientDetails = (props: Props) => {
    return (
        <p className={styles.block}>
            <p className={styles.img}>
                <img src={props.item.image_large} alt={props.item.name} ></img>
            </p>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{props.item.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={props.item.calories} />
                <NutritionValue name="Белки, г" val={props.item.proteins} />
                <NutritionValue name="Жиры, г" val={props.item.fat} />
                <NutritionValue name="Углеводы, г" val={props.item.carbohydrates} />
            </ul>
        </p>
    )
}
export default IngredientDetails