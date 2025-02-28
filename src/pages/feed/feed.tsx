import { FC, useEffect } from "react";

import styles from './styles.module.css';
import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { OrdersStat } from "../../components/orders-stat/orders-stat";
import { useDispatch, useSelector } from "../../services/store";
import { WebsocketStatus } from './../../utils/types';
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import { API_WS_ALLFEED } from './../../utils/constants'

export const Feed: FC = () => {
    const dispatch = useDispatch();
    const { status, feed } = useSelector((state) => state.Feed);

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
        <div className={styles.container}>
            <ul className={styles.main} >
                <OrdersFeed feed={feed} />
                <OrdersStat feed={feed} />
            </ul>
        </div>
    )
}
export default Feed;
