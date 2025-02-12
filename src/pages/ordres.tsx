import { FC } from "react";

import styles from './styles.module.css';
import { OrderList } from "../components/order-list/order-list";

export const Orders: FC = () => {
    return (
        <ul className={styles.main} >
            <p className="text text_type_main-large">Лента заказов</p>
            <OrderList />
        </ul>
    )
}
export default Orders;
