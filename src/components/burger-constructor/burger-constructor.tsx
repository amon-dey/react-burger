import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card"
import PropTypes from 'prop-types';
import { Price } from "../price/price"
import { ingredientItem, IngredientType } from "../../utils/types"
import styles from './styles.module.css';

const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (let item of data) {
        totalPrice += item.price
    }
    return totalPrice
}

type Props = {
    data: ingredientItem[]
}

export const BurgerConstructor = (props: Props) => {
    const budItem = props.data[0]

    return (
        <section className={styles.row}>
            <span className='p-25'></span>
            <ul className={styles.ul}>
                <BurgerConstructorCard item={budItem} key={budItem._id} card_type="top" />
                {props.data.map((item) =>
                    <BurgerConstructorCard item={item} key={item._id} />
                )}
                <BurgerConstructorCard item={budItem} key={budItem._id} card_type="bottom" />
                <span className='p-10'></span>
                <li className={`${styles.li_total} p-4 `}>
                    <Price price={totalPrice(props.data)} extra_class='text_type_main-large' />
                    <Button htmlType="button" type="primary" size="large">
                        Офоримть заказ
                    </Button>
                </li>
            </ul>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        IngredientType
    ).isRequired
};

export default BurgerConstructor