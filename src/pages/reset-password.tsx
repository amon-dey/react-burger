import { FC, useState } from "react";

import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "../services/store";
import { resetPassword } from "../services/thunks/thunks";

const PageResetPassword: FC = () => {
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    if (!state || !state.fromForgotPassword) {
        navigate("/reset-password", { replace: true, });
        return null;
    }

    const handleOnClick = () => {
        dispatch(resetPassword({ password: password, token: token }));
        navigate("/login", { replace: true })
    }

    return (
        <form title="Восстановление пароля" onSubmit={handleOnClick} className={styles.container}>
            <p className="text text_type_main-medium m-6">Восстановление пароля</p>
            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} extraClass="m-6" autoComplete="password" />

            <Input id="emailtoken" type={'text'} placeholder={'Введите код из письма'}
                onChange={e => setToken(e.target.value)} value={token} extraClass="m-6" />

            <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive mt-20">
                Вспомнили пароль ?<Link to="/login">Войти</Link>
            </p>
        </form>
    );
};

export default PageResetPassword;