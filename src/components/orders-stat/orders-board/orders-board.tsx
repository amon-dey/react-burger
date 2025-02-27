import styles from './styles.module.css';
import { useSelector } from "../../../services/store";

export const OrdersBoard = () => {

    const { feed } = useSelector((state) => state.Feed);

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <div className={styles.done}>
                    {
                        feed.orders
                            .filter(order => order.status === 'done')
                            .slice(0, 10)
                            .map(order =>
                                <p key={order.number} className="text text_type_digits-default">{order.number}</p>
                            )
                    }
                </div>
            </div>
            <div className={styles.column}>
                <p className="text text_type_main-medium mb-6">В работе</p>
                {
                    feed.orders
                        .filter(order => order.status !== 'done')
                        .slice(0, 10)
                        .map(order =>
                            <p key={order.number} className="text text_type_digits-default">{order.number}</p>
                        )
                }
            </div>
        </div>
    );
};

export default OrdersBoard;