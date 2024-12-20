import { useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card"
import PropTypes from 'prop-types';
import { Price } from "../price/price"
import { Modal } from "../modal/modal"
import { OrderDetails } from "../order-details/order-details"

import { ingredientItem, IngredientType } from "../../utils/types"
import styles from './styles.module.css';

const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (let item of data) {
        totalPrice += item.price;
    }
    return totalPrice;
}

type Props = {
    data: ingredientItem[]
}

export const BurgerConstructor = (props: Props) => {
    const budItem = props.data[0];

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    return (
        <section className={styles.row}>
            <span className='p-25'></span>
            <BurgerConstructorCard item={budItem} cardType="top" />
            <ul className={styles.ul}>
                {props.data
                    .filter(item => item.type !== budItem.type)
                    .map((item) =>
                        <BurgerConstructorCard item={item} key={item._id} />
                    )}
            </ul>
            <BurgerConstructorCard item={budItem} cardType="bottom" />
            <span className='p-10'></span>
            <li className={`${styles.li_total} p-4 `}>
                <Price price={totalPrice(props.data)} extra_class='text_type_main-large' />
                <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>
                    Офоримть заказ
                </Button>
            </li>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        IngredientType
    ).isRequired
};

export default BurgerConstructor