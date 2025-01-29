import { FC, useState } from "react";

import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "../services/store";
import styles from "./styles.module.css";
import { login } from "../services/thunks/thunks";

const PageLogin: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ email: email, password: password }));
        navigate(-1);
    }

    return (
        <form title="Вход" onSubmit={handleOnClick} className={styles.container}>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="m-6" autoComplete="email" />

            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} extraClass="m-6" autoComplete="current-password" />

            <Button htmlType="submit" type="primary" size="medium">
                Войти
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20">
                Вы новый пользователь ?<Link to="/register">Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль ?<Link to="/forgot-password">Восстановить пароль</Link>
            </p>
        </form>
    );
};

export default PageLogin;