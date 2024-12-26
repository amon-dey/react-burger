import { NutritionValue } from "./nutrition-value/nutrition-value";

import styles from "./styles.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';

export const IngredientDetails = () => {
    const { selectedIngredient: selected } = useSelector((state: RootState) => state.burgerIngredients);
    if (!selected) { return }
    return (
        <section className={styles.block}>
            <span className={styles.img}>
                <img src={selected.image_large} alt={selected.name} ></img>
            </span>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{selected.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={selected.calories} />
                <NutritionValue name="Белки, г" val={selected.proteins} />
                <NutritionValue name="Жиры, г" val={selected.fat} />
                <NutritionValue name="Углеводы, г" val={selected.carbohydrates} />
            </ul>
        </section>
    );
};
export default IngredientDetails;