import { useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem, ingredientItemTypes, ingredientItemGroupName } from "../../utils/types"
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group"

import { groupBy } from "./utils"

import styles from './styles.module.css';

type Props = {
    data: ingredientItem[];
}

export const BurgerIngredients = (props: Props) => {
    const [currentTab, setCurrentTab] = useState(`${ingredientItemTypes[0].type}`);
    const groupedByGrade = groupBy(props.data, (item) => String(item.type));
    const groupedIng = Object.entries(groupedByGrade);

    const arrayOfGroupRefs = Array.from(
        { length: ingredientItemTypes.length },
        () => useRef<HTMLDivElement>(null)
    );

    useEffect(() => {
        const focusToCurrentTab = () => {
            const currentTabNumber = ingredientItemTypes.findIndex(item => item.type === currentTab)
            const groupRef = arrayOfGroupRefs[currentTabNumber].current;
            if (groupRef !== null) {
                groupRef.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        focusToCurrentTab();
    });

    return (
        <section className={`${styles.row} mb-10`}>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <div className={`${styles.tab_block} mb-10}`}>
                {
                    ingredientItemTypes.map(
                        (item: ingredientItemGroupName) => (
                            <Tab value={item.type} active={currentTab === item.type} onClick={setCurrentTab} key={item.type}>
                                {item.translated_name}</Tab>
                        ))
                }
            </div>
            <div className={styles.grouped_items}>
                {
                    groupedIng
                        .map(
                            (type, index) =>
                                <BurgerIngredientsGroup ref={arrayOfGroupRefs[index]} group={type[0]} items={type[1]} key={type[0]} />
                        )
                }
            </div>
        </section>
    )
}

export default BurgerIngredients
