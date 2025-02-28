import styles from './styles.module.css';
import { IFeed } from '../../../utils/types'

type Props = {
    feed: IFeed
}

export const OrdersBoard = (props: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <div className={styles.done}>
                    {
                        props.feed.orders
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
                    props.feed.orders
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