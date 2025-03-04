import { memo, useEffect } from 'react';
import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { useDispatch, useSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import { API_WS_PROFILE_FEED } from './../../utils/constants'

export const FeedProfile = () => {
    const dispatch = useDispatch();
    const { feed } = useSelector((state) => state.FeedProfile);

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken")
        if (accessToken === null) return;

        accessToken = accessToken.replace("Bearer ", "");

        dispatch(wsConnect(API_WS_PROFILE_FEED + "?token=" + accessToken));
        return () => {
            dispatch(wsDisconnect());
        }
    }, [dispatch])

    return (
        <OrdersFeed feed={feed} />
    );
};

export default memo(FeedProfile);