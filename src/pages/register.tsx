import { FC, useState } from "react";

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const PageRegister: FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">Регистрация</p>
            <div className="m-6"></div>
            <Input type={'text'} placeholder={'Имя'} onChange={e => setUsername(e.target.value)} value={username} />
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
            <Button htmlType="button" type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <div className="m-20"></div>
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы ?
                <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default PageRegister;