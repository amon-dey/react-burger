import { FC, useState, useMemo } from "react";
import { useDispatch } from "../services/store";
import { useSelector } from "../services/store.ts";
import { getUser } from "../services/user/slice.ts";
import { userSetInfo } from "../services/thunks/thunks.ts";

import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

const PageUserDetails: FC = () => {
    const User = useSelector(getUser);
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>(User ? User.name : "");
    const [email, setEmail] = useState<string>(User ? User.email : "")
    const [password, setPassword] = useState('')

    const handleOnSubmit = () => {
        dispatch(userSetInfo({ email: email, password: password, name: username }));
    }
    const handleOnRevert = () => {
        setUsername(User ? User.name : "")
        setPassword('');
        setEmail(User ? User.email : "")
    }

    const isChanged = useMemo(() => {
        if (User === null) return false;
        if (username !== User.name || email !== User.email || password !== '') return true
    }, [User, email, password, username])

    return (
        <form title="Профиль">
            <Input id="username" type={'text'} placeholder={'Имя'} onChange={e => setUsername(e.target.value)}
                value={username} extraClass="mb-6" autoComplete="username" />

            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="mb-6" autoComplete="email" />

            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} autoComplete="current-password" />
            <span>
                <Button htmlType="button" type="primary" size="medium"
                    onClick={handleOnRevert} extraClass="m-6" disabled={!isChanged}>
                    Отменить
                </Button>
                <Button htmlType="button" type="primary" size="medium"
                    onClick={handleOnSubmit} extraClass="m-6" disabled={!isChanged}>
                    Сохранить
                </Button>
            </span>
        </form>
    );
};

export default PageUserDetails;