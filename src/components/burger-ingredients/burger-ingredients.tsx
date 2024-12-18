import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem, ingredientItemTypes, ingredientItemGroupName } from "../../utils/types"
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group"

import { groupBy } from "./utils"

import styles from './styles.module.css';

type Props = {
    data: ingredientItem[]
}

export const BurgerIngredients = (props: Props) => {
    const [current, setCurrent] = useState(`${ingredientItemTypes[0].type}`)
    const groupedByGrade = groupBy(props.data, (item) => String(item.type));
    const groupedIng = Object.entries(groupedByGrade)
    return (
        <>
            <section className={styles.row}>
                <p className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </p>
                <div className={`${styles.tab_block} mb-10}`}>
                    {
                        ingredientItemTypes.map(
                            (item: ingredientItemGroupName) => (
                                <Tab value={item.type} active={current === item.type} onClick={setCurrent} key={item.type}>
                                    {item.translated_name}</Tab>
                            ))
                    }
                </div>
                <div className={styles.grouped_items}>
                    {
                        groupedIng.map((type) =>
                            <BurgerIngredientsGroup group={type[0]} items={type[1]} key={type[0]}></BurgerIngredientsGroup>
                        )
                    }
                </div>
            </section>
            <span className="m-10" />
        </>
    )
}

export default BurgerIngredients
