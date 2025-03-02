import { FC } from "react";

import styles from './styles.module.css';

export const OrdersDetails: FC = () => {
    return (
        <ul className={styles.main}>
            <p>Детали заказа</p>
        </ul>
    )
}
export default OrdersDetails;