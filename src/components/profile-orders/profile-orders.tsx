import { memo } from 'react';
import styles from './styles.module.css';
import { OrderCard } from '../orders-feed/order-card/order-card';

export const ProfileOrdersFeed = () => {

    return (
        <section className={`${styles.row} m-6`}>
            <ul>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </ul>
        </section>
    );
};

export default memo(ProfileOrdersFeed);