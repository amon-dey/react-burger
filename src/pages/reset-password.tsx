import { FC, useState } from "react";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const PageResetPassword: FC = () => {
    const [emailcode, setEmailCode] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">Восстановление пароля</p>
            <div className="m-6"></div>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                icon={'ShowIcon'}
                value={password}
                onIconClick={() => setShowPassword(!showPassword)}
            />
            <div className="m-6"></div>
            <Input type={'text'} placeholder={'Введите код из письма'} onChange={e => setEmailCode(e.target.value)} value={emailcode} />
            <div className="m-6"></div>
            <Button htmlType="button" type="primary" size="medium">
                Сохранить
            </Button>
            <div className="m-20"></div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль ?
                <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default PageResetPassword;