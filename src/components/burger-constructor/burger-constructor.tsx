import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card";
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import { useModal } from "../../hooks/useModal";
import { ingredientItem } from "../../utils/types";
import styles from './styles.module.css';
import { RootState } from '../../services/store';
import { useSelector } from 'react-redux';


const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (const item of data) {
        totalPrice += item.price;
    }
    return totalPrice;
};



export const BurgerConstructor = () => {
    const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructor);
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <section className={styles.row}>
            <span className='p-25'></span>

            <BurgerConstructorCard ingredient={bun} cardType="top" />
            {
                ingredients.length > 0 ?
                    <ul className={styles.ul}>
                        {ingredients
                            .map((ingredient) =>
                                <BurgerConstructorCard ingredient={ingredient} key={ingredient._id} />
                            )}
                    </ul>
                    : <BurgerConstructorCard ingredient={null} key={0} />
            }

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