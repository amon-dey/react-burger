import { FC } from "react";
import styles from "./styles.module.css";
import IngredientDetails from './../components/burger-ingredients/ingredient-details/ingredient-details';

export const PageIngredientDetails: FC = () => {

    return (
        <div className={styles.container}>
            <a className="text text_type_main-large">Детали ингедиента</a>
            <IngredientDetails />
        </div>
    )
}
export default PageIngredientDetails;