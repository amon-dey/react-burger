import { memo } from 'react';
import styles from './styles.module.css';
import { OrderCard } from './order-card/order-card';
import { IFeed } from '../../utils/types'
import { useMatch } from 'react-router-dom';

type Props = {
    feed: IFeed
    children?: React.ReactNode;
}

export const OrdersFeed = (props: Props) => {
    const isGlobalFeed = useMatch("/feed/")

    return (
        <section className={`${styles.row} m-6`}>
            {
                isGlobalFeed && (
                    <p className="text text_type_main-large mb-6">Лента заказов</p>
                )
            }
            {props.children}
            <ul className={`${styles.ul} mr-2`} id="feed_list">
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