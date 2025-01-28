import { FC, useState } from "react";
import { useSelector } from "../services/store";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const PageUserDetails: FC = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    const [email, setEmail] = useState(user.user ? user.user.name : "")
    const [username, setUsername] = useState(user.user ? user.user.email : "");
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
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
        </>
    );
};

export default PageUserDetails;