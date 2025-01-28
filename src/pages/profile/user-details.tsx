import { FC, useState } from "react";
import { useSelector } from "../../services/store";

import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

const PageUserDetails: FC = () => {
    const user = useSelector((state) => state.user.user);

    const [email, setEmail] = useState(user ? user.email : "")
    const [username, setUsername] = useState(user ? user.name : "");
    const [password, setPassword] = useState('')

    return (
        <form title="Профиль">
            <Input id="username" type={'text'} placeholder={'Имя'} onChange={e => setUsername(e.target.value)}
                value={username} extraClass="mb-6" autoComplete="username" />

            <EmailInput id="email" onChange={e => setEmail(e.target.value)}
                value={email} name={'e-mail'} isIcon={false} extraClass="m-6" autoComplete="email" />

            <PasswordInput id="password" onChange={e => setPassword(e.target.value)}
                value={password} name={'Пароль'} autoComplete="current-password" />
        </form>
    );
};

export default PageUserDetails;