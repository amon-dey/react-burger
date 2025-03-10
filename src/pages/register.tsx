import { FC, useState } from "react";

import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { postRegister } from './../services/thunks/thunks'
import { useDispatch } from "../services/store";

const PageRegister: FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(postRegister({
            name: username,
            email: email,
            password: password
        }));
    }

    return (
        <form title="Регистрация" onSubmit={handleOnClick} className={styles.container}>
            <p className="text text_type_main-medium m-6">Регистрация</p>

            <Input id="username" type={'text'} placeholder={'Имя'} onChange={e => setUsername(e.target.value)}
                value={username} extraClass="m-6" autoComplete="username" />

            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="m-6" autoComplete="email" />

            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} extraClass="m-6" autoComplete="current-password" />

            <Button htmlType="submit" type="primary" size="medium">
                Зарегистрироваться
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20">
                Уже зарегистрированы ?<Link data-test="login" to="/login">Войти</Link>
            </p>
        </form>
    );
};

export default PageRegister;