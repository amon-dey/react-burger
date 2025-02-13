import { memo } from 'react';
import styles from './styles.module.css';
import { OrderCard } from './order-card/order-card';

export const OrdersFeed = () => {

    return (
        <section className={`${styles.row} m-6`}>
            <p className="text text_type_main-large mb-6">Лента заказов</p>
            <ul>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </ul>
        </section>
    );
};

export default memo(OrdersFeed);