import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card";
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import { useModal } from "../../hooks/useModal";
import { ingredientItem } from "../../utils/types";
import styles from './styles.module.css';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetConstructor } from '../../services/burger-constructor/slice';


const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (const item of data) {
        totalPrice += item.price;
    }
    return totalPrice;
};



export const BurgerConstructor = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructor);

    const { isModalOpen, openModal, closeModal } = useModal();
    useEffect(() => {
        dispatch(resetConstructor());
    }, [dispatch]);

    return (
        <section className={styles.row}>
            <span className='p-25'></span>
            <BurgerConstructorCard ingredient={bun} cardType="top" />
            <ul className={styles.ul}>
                {ingredients
                    .map((ingredient) =>
                        <BurgerConstructorCard ingredient={ingredient} key={ingredient._id} />
                    )}
            </ul>
            <BurgerConstructorCard ingredient={bun} cardType="bottom" />
            <span className='p-10'></span>
            <li className={`${styles.li_total} p-4 `}>
                <Price price={totalPrice(ingredients)} extra_class='text_type_main-large' />
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

export default BurgerConstructor;