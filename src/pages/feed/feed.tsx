import { FC, useEffect } from "react";
import styles from './styles.module.css';
import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { OrdersStat } from "../../components/orders-stat/orders-stat";
import { useDispatch, useSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import { API_WS_ALLFEED } from './../../utils/constants'

export const Feed: FC = () => {
    const dispatch = useDispatch();
    const { feed } = useSelector((state) => state.Feed);

    useEffect(() => {
        dispatch(wsConnect(API_WS_ALLFEED));
        return () => {
            dispatch(wsDisconnect());
        }
    }, [dispatch])

    return (
        <div className={styles.container}>

            <ul className={styles.main} >
                <OrdersFeed feed={feed} >
                    <p className="text text_type_main-large mb-6">Лента заказов</p>
                </OrdersFeed>
                <OrdersStat feed={feed} />
            </ul>
        </div>
    )
}
export default Feed;