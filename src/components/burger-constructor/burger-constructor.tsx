import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card";
import PropTypes from 'prop-types';
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import { useModal } from "../../hooks/useModal";
import { ingredientItem, IngredientType } from "../../utils/types";
import styles from './styles.module.css';


const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (const item of data) {
        totalPrice += item.price;
    }
    return totalPrice;
};

type Props = {
    ingredients: ingredientItem[];
};

export const BurgerConstructor = (props: Props) => {
    const bun = props.ingredients[0];

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <section className={styles.row}>
            <span className='p-25'></span>
            <BurgerConstructorCard ingredient={bun} cardType="top" />
            <ul className={styles.ul}>
                {props.ingredients
                    .filter(ingredient => ingredient.type !== bun.type)
                    .map((ingredients) =>
                        <BurgerConstructorCard ingredient={ingredients} key={ingredients._id} />
                    )}
            </ul>
            <BurgerConstructorCard ingredient={bun} cardType="bottom" />
            <span className='p-10'></span>
            <li className={`${styles.li_total} p-4 `}>
                <Price price={totalPrice(props.ingredients)} extra_class='text_type_main-large' />
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                    Офоримть заказ
                </Button>
            </li>
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        IngredientType
    ).isRequired
};

export default BurgerConstructor;