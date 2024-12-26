import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import styles from './styles.module.css';
import { AppDispatch, RootState } from './../../services/store';
import { useSelector, useDispatch } from 'react-redux';
import { resetOrder, setOrder } from './../../services/burger-constructor/order';
import { useMemo } from 'react';
import { BurgerConstructorBun } from "./burger-constructor-bun/burger-constructor-bun";
import { BurgerConstructorIngredients } from "./burger-constructor-ingredients/burger-constructor-ingredients";

export const BurgerConstructor = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructorIngredients);
    const { orderNumber } = useSelector((state: RootState) => state.BurgerConstructorOrder);

    const totalPrice = useMemo(() => {
        let totalPrice = 0;
        for (const item of ingredients) {
            totalPrice += item.price;
        }
        if (bun !== null) {
            totalPrice += bun.price * 2;
        }
        return totalPrice;
    }, [ingredients, bun]);

    const disableOrderButton = useMemo(() => {
        if (!ingredients.length || !bun) return true;
        return false;
    }, [ingredients, bun]);

    return (
        <section className={styles.row}>
            <span className={`${styles.span} mb-25`}></span>

            <BurgerConstructorBun cardType="top" />
            <BurgerConstructorIngredients />
            <BurgerConstructorBun cardType="bottom" />

            <span className='p-10'></span>

            <li className={`${styles.li_total} p-4 `}>
                <Price price={totalPrice} extra_class='text_type_main-large' />
                <Button htmlType="button" type="primary" size="large"
                    onClick={() => (dispatch(setOrder(10)))}
                    disabled={disableOrderButton}>
                    Офоримть заказ
                </Button>
            </li>
            {orderNumber && (
                <Modal closeModal={() => { dispatch(resetOrder()); }}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;