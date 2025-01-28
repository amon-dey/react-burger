import { FC, useState } from "react";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "../services/store";
import { forgotPassword } from "../services/thunks/thunks";

const ForgotPasswordPage: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(forgotPassword(email));
        navigate("/reset-password", { replace: true })
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">Востановление пароля</p>
            <div className="m-6"></div>
            <Input type={'text'} placeholder={'e-mail'} onChange={e => setEmail(e.target.value)} value={email} />
            <div className="m-6"></div>
            <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
                Восстановить
            </Button>
            <div className="m-20"></div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль ?
                <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;