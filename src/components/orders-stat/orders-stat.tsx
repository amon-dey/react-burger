import { memo } from 'react';
import styles from './styles.module.css';
import { OrdersBoard } from './orders-board/orders-board'
import { IFeed } from '../../utils/types'

type Props = {
    feed: IFeed
}

export const OrdersStat = (props: Props) => {
    return (
        <section className={`${styles.row} m-6`}>
            <OrdersBoard feed={props.feed} />
            <p className='text text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className="text text_type_digits-large">{props.feed.total}</p>
            <p className='text text text_type_main-medium mt-15'>Выполнено за сегодня::</p>
            <p className="text text_type_digits-large">{props.feed.totalToday}</p>
        </section>
    );
};

export default memo(OrdersStat);