import { memo } from 'react';
import styles from './styles.module.css';
import { OrderCard } from './order-card/order-card';
import { IFeed } from '../../utils/types'

type Props = {
    feed: IFeed
    children?: React.ReactNode;
}

export const OrdersFeed = (props: Props) => {

    return (
        <section className={`${styles.row} m-6`}>
            {props.children}
            <ul className={`${styles.ul} mr-2`}>
                {
                    props.feed.orders.map(order =>
                        <OrderCard order={order} key={order._id} />
                    )
                }
            </ul>
        </section>
    );
};

export default memo(OrdersFeed);