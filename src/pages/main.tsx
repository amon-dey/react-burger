import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "./../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../components/burger-constructor/burger-constructor";

import styles from './styles.module.css';

const PageMain: FC = () => {
    return (
        <ul className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </ul>
    );
};

export default PageMain;