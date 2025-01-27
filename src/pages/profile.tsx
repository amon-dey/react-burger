import { FC, useState } from "react";
import styles from "./profile.module.css";
import PageUserDetails from './profile-user-details';
import CustomTab from './customtab/customtab';

const ProfilePage: FC = () => {
    const [current, setCurrent] = useState('Профиль');

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <CustomTab value="Профиль" active={current === 'Профиль'} onClick={() => setCurrent('Профиль')} >
                    <span className="text text_type_main-medium">Профиль</span>
                </CustomTab>
                <CustomTab value="История заказов" active={current === 'История заказов'} onClick={() => setCurrent('История заказов')}>
                    <span className="text text_type_main-medium">История заказов</span>
                </CustomTab>
                <CustomTab value="Выход" active={current === 'Выход'} onClick={() => setCurrent('Выход')} >
                    <span className="text text_type_main-medium">Выход</span>
                </CustomTab>
                <p className="p-20" />
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.subpage}>
                {current === 'Профиль' && <PageUserDetails />}
                {current === 'История заказов' && <div>Истрия заказов</div>}
                {current === 'Выход' && <div>Выход</div>}
            </div>
        </div>
    );
};

export default ProfilePage;