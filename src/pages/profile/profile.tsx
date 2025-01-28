import { FC, useEffect, useState } from "react";

import styles from "./styles.module.css";
//import PageUserDetails from '../user-details';
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { logout } from "../../services/thunks/thunks";

import Tab from '../../components/tab/tab';

const ProfilePage: FC = () => {
    const [current, setCurrent] = useState('Профиль');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (current === 'История заказов') {
            navigate("/profile/orders", { replace: true, });
        }
        if (current === 'Профиль') {
            navigate("/profile/", { replace: true, });
        }
        if (current === 'Выход') {
            dispatch(logout());
        }
    }, [current, dispatch, navigate])

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <Tab value="Профиль" active={current === 'Профиль'} onClick={() => setCurrent('Профиль')} >
                    <span className="text text_type_main-medium">Профиль</span>
                </Tab>
                <Tab value="История заказов" active={current === 'История заказов'} onClick={() => setCurrent('История заказов')}>
                    <span className="text text_type_main-medium">История заказов</span>
                </Tab>
                <Tab value="Выход" active={current === 'Выход'} onClick={() => setCurrent('Выход')} >
                    <span className="text text_type_main-medium">Выход</span>
                </Tab>
                <p className="p-20" />
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.subpage}>
                <Outlet />
            </div>
        </div>
    );
};

export default ProfilePage;