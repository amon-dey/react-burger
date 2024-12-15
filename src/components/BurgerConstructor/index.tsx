import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorCard } from "./burgerconstructorcard"
import PropTypes from 'prop-types';
import { Price } from "../price"
import Ingredient from "../../utils/types"

import styles from './styles.module.css';

const getItemType = (index: number, last: number): "top" | "bottom" | undefined => {
    if (last < 2) {
        return
    }
    if (index == 0) {
        return "top"
    }
    if (index === last - 1) {
        return "bottom"
    }
}

const checkTotal = (data: Ingredient[]): number => {
    let totalPrice = 0;
    for (let item of data) {
        totalPrice += item.price
    }
    return totalPrice
}

type Props = {
    data: Ingredient[]
}

export const BurgerConstructor = (props: Props) => {
    return (
        <div className={styles.burgerconstructor}>
            <span className='p-25'></span>
            <ul className={styles.ul}>
                {
                    props.data.map((item, index) =>
                        <BurgerConstructorCard
                            item={item}
                            card_type={getItemType(index, props.data.length)}
                            key={item._id}
                        />
                    )
                }
                <span className='p-10'></span>
                <li className={`${styles.li_total} p-4 `}>
                    <Price price={checkTotal(props.data)} extra_class='text_type_main-large' />
                    <Button htmlType="button" type="primary" size="large">
                        Офоримть заказ
                    </Button>
                </li>
            </ul>
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

BurgerConstructor.propTypes = propTypes;

export default BurgerConstructor