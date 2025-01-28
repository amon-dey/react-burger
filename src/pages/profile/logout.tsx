import { FC } from "react";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/store";
import styles from "./styles.module.css";
import { logout } from "../../services/thunks/thunks";

const PageLogout: FC = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(logout());
    }

    return (
        <>
            <div className="m-6"></div>
            <Button htmlType="button" type="primary" size="large" extraClass={styles.logoutbutton}
                onClick={handleOnClick} width={'40rem'}>
                Выйти
            </Button>
            <div className="m-6"></div>
        </>
    );
};

export default PageLogout;