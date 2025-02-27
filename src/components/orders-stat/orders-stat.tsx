import { memo } from 'react';
import styles from './styles.module.css';
import { OrdersBoard } from './orders-board/orders-board'

import { useSelector } from "../../services/store";

export const OrdersStat = () => {
    const { total, totalToday } = useSelector((state) => state.Feed.feed);

    return (
        <section className={`${styles.row} m-6`}>
            <OrdersBoard />
            <p className='text text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className="text text_type_digits-large">{total}</p>
            <p className='text text text_type_main-medium mt-15'>Выполнено за сегодня::</p>
            <p className="text text_type_digits-large">{totalToday}</p>
        </section>
    );
};

export default memo(OrdersStat);