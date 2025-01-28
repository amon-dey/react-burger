import { FC } from "react";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../services/store";
import styles from "./login.module.css";
import { logout } from "../services/thunks/thunks";

const PageLogout: FC = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(logout());
    }

    return (
        <div className={styles.container}>
            <div className="m-6"></div>
            <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
                Выйти
            </Button>
            <div className="m-6"></div>
        </div>
    );
};

export default PageLogout;