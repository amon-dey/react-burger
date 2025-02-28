import { memo, useEffect } from 'react';
import styles from './styles.module.css';
import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { useDispatch, useSelector } from "../../services/store";
import { WebsocketStatus } from './../../utils/types';
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import { API_WS_ALLFEED } from './../../utils/constants'

export const ProfileOrdersFeed = () => {
    const dispatch = useDispatch();
    const { status, feed } = useSelector((state) => state.FeedProfile);

    useEffect(() => {
        dispatch(wsConnect(API_WS_ALLFEED));
        return () => {
            dispatch(wsDisconnect())
        }
    }, [])

    if (status !== WebsocketStatus.ONLINE)
        return (
            <p className="text text_type_main-large">Загрузка ленты заказов</p>
        )

    return (
        <section className={`${styles.row} m-6`}>
            <ul>
                <OrdersFeed feed={feed} />
            </ul>
        </section>
    );
};

export default memo(ProfileOrdersFeed);