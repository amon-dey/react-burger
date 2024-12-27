import { NutritionValue } from "./nutrition-value/nutrition-value";

import styles from "./styles.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';

export const IngredientDetails = () => {
    const { selectedIngredient } = useSelector((state: RootState) => state.burgerIngredientsSelectedIngredient);
    if (!selectedIngredient) { return; }
    return (
        <section className={styles.block}>
            <span className={styles.img}>
                <img src={selectedIngredient.image_large} alt={selectedIngredient.name} ></img>
            </span>
            <p className={`${styles.name} text_type_main-medium mt-4 mb-8`}>{selectedIngredient.name}</p>
            <ul className={`${styles.group} text text_type_main-default text_color_inactive`}>
                <NutritionValue name="Калории,ккал" val={selectedIngredient.calories} />
                <NutritionValue name="Белки, г" val={selectedIngredient.proteins} />
                <NutritionValue name="Жиры, г" val={selectedIngredient.fat} />
                <NutritionValue name="Углеводы, г" val={selectedIngredient.carbohydrates} />
            </ul>
        </section>
    );
};
export default IngredientDetails;