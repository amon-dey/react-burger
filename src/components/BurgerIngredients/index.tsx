import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient, ingredientTypes, IngredientGroupNames } from "../../utils/types"
import { BurgerIngredientsGroup } from "./burgeringredientsgroup"

import { groupBy } from "./utils"

import PropTypes from 'prop-types';

import styles from './styles.module.css';

type Props = {
    data: Ingredient[]
}

export const BurgerIngredients =(props: Props) => {
    const [current, setCurrent] = useState(`${ingredientTypes[0].type}`)
    const groupedByGrade = groupBy(props.data, (item) => String(item.type));
    const groupedIng = Object.entries(groupedByGrade)
    return (
        <div>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <div className={`${styles.tab_block} mb-10}`}>
                {
                    ingredientTypes.map(
                        (item: IngredientGroupNames) => (
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
        </div>
    )
}

const propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired,
        })).isRequired
};

BurgerIngredients.propTypes = propTypes;


export default BurgerIngredients
