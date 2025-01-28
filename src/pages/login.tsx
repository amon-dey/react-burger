import { FC, useState } from "react";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "../services/store";
import styles from "./styles.module.css";
import { login } from "../services/thunks/thunks";

const PageLogin: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(login({email: email, password: password}));
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">Вход</p>
            <div className="m-6"></div>
            <Input type={'text'} placeholder={'e-mail'} onChange={e => setEmail(e.target.value)} value={email} />
            <div className="m-6"></div>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                icon={'ShowIcon'}
                value={password}
                onIconClick={() => setShowPassword(!showPassword)}
            />
            <div className="m-6"></div>
            <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
                Войти
            </Button>
            <div className="m-20"></div>
            <p className="text text_type_main-default text_color_inactive">
                Вы новый пользователь ?
                <Link to="/register">Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль ?
                <Link to="/forgot-password">Восстановить пароль</Link>
            </p>
        </div>
    );
};

export default PageLogin;