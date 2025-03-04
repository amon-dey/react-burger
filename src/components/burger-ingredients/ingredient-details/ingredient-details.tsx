import { NutritionValue } from "./nutrition-value/nutrition-value";

import styles from "./styles.module.css";
import { useSelector } from "./../../../services/store";
import { useLocation, useParams } from "react-router-dom";
import { IngredientItemType } from './../../../utils/types';

export const IngredientDetails = () => {
    const { isError, isLoading, ingredients } = useSelector((state) => state.burgerIngredientsIngredient);

    const { id: urlId } = useParams();
    const location = useLocation();
    const stateId = location.state?.id;

    const id = urlId || stateId;

    const findIngeredientById = (id: string | undefined): IngredientItemType | null | undefined => {
        if (ingredients === null) return null;
        return ingredients.find((ingredient) => ingredient._id === id);
    }
    const selectedIngredient = findIngeredientById(id);

    if (isLoading || isError) { return null; }
    if (!selectedIngredient) {
        return (
            <>
                <p className="text text_type_main-medium p-20 text_color_inactive">Ингредиент не найден</p>
            </>
        )
    }
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
