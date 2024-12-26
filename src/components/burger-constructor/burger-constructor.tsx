import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard } from "./burger-constructor-card/burgerconstructor-card";
import { Price } from "../price/price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import { ingredientItem } from "../../utils/types";
import styles from './styles.module.css';
import { AppDispatch, RootState } from './../../services/store';
import { useSelector, useDispatch } from 'react-redux';
import { resetOrder, setOrder } from './../../services/burger-constructor/order'

const totalPrice = (data: ingredientItem[]): number => {
    let totalPrice = 0;
    for (const item of data) {
        totalPrice += item.price;
    }
    return totalPrice;
};


export const BurgerConstructor = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructorIngredients);
    const { orderNumber } = useSelector((state: RootState) => state.BurgerConstructorOrder);

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
                <Button htmlType="button" type="primary" size="large" onClick={ ()=>( dispatch(setOrder(10)))}>
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