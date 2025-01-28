import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import styles from './styles.module.css';
import { useSelector, useDispatch } from './../../services/store';
import { resetOrder, setOrderIngredients } from '../../services/burger-constructor/burger-constructor-order';
import { useMemo } from 'react';
import { BurgerConstructorBun } from "./burger-constructor-bun/burger-constructor-bun";
import { BurgerConstructorIngredients } from "./burger-constructor-ingredients/burger-constructor-ingredients";
import { resetConstructor } from '../../services/burger-constructor/burger-constructor-ingredients';
import { postOrder } from '../../services/thunks/thunks';


export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector((state) => state.burgerConstructorIngredients);
    const { orderNumber } = useSelector((state) => state.BurgerConstructorOrder);
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

    const handleOnOrderClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        if (ingredients !== null && bun !== null) {
            dispatch(setOrderIngredients([bun, ...ingredients, bun]));
            dispatch(postOrder([bun, ...ingredients, bun]));
        }
    };

    const handleCloseOrderModal = () => {
        dispatch(resetConstructor());
        dispatch(resetOrder());
    };

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
                    onClick={handleOnOrderClick}
                    disabled={disableOrderButton}>
                    Офоримть заказ
                </Button>
            </li>
            {orderNumber && (
                <Modal closeModal={handleCloseOrderModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;