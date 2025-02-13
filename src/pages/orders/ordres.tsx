import { FC } from "react";

import styles from './styles.module.css';
import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { OrdersStat } from "../../components/orders-stat/orders-stat";

export const Orders: FC = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.main} >
                <OrdersFeed />
                <OrdersStat />
            </ul>
        </div>
    )
}
export default Orders;
