import { memo } from 'react';
import styles from './styles.module.css';
import { OrdersBoard } from './orders-board/orders-board'

export const OrdersStat = () => {

    return (
        <section className={`${styles.row} m-6`}>
            <OrdersBoard />
            <p className='text text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className="text text_type_digits-large">28752</p>
            <p className='text text text_type_main-medium mt-15'>Выполнено за сегодня::</p>
            <p className="text text_type_digits-large">138</p>
        </section>
    );
};

export default memo(OrdersStat);