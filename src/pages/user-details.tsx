import { FC, useState } from "react";
import { useSelector } from "../services/store.ts";
import { getUser } from "../services/user/slice.ts";

import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

const PageUserDetails: FC = () => {
    const User = useSelector(getUser);

    const [username, setUsername] = useState<string>(User ? User.name : "");
    const [email, setEmail] = useState<string>(User ? User.email : "")
    const [password, setPassword] = useState('')

    return (
        <form title="Профиль">
            <Input id="username" type={'text'} placeholder={'Имя'} onChange={e => setUsername(e.target.value)}
                value={username} extraClass="mb-6" autoComplete="username" />

            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="mb-6" autoComplete="email" />

            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} autoComplete="current-password" />
        </form>
    );
};

export default PageUserDetails;