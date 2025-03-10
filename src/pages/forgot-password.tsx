import { FC, useState } from "react";

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "../services/store";
import { forgotPassword } from "../services/thunks/thunks";

const ForgotPasswordPage: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(forgotPassword(email));
        navigate("/reset-password", { replace: true, state: { fromForgotPassword: true } })
    }

    return (
        <form title="Востановление пароля" onSubmit={handleOnClick} className={styles.container}>
            <p className="text text_type_main-medium">Востановление пароля</p>
            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="m-6" autoComplete="email" />
            <Button htmlType="submit" type="primary" size="medium">
                Восстановить
            </Button>
            <div className="m-20"></div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль ?<Link data-test="login" to="/login">Войти</Link>
            </p>
        </form>
    );
};

export default ForgotPasswordPage;