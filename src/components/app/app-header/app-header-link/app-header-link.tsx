import { useLocation, Link } from 'react-router-dom';

import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { FC } from 'react';

type Props = {
    icon: FC<TIconProps>;
    title: string;
    linkLocation: string;
};

import styles from "./styles.module.css";
export const AppHeaderLink: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
    const location = useLocation();
    let isActive = false
    if (props.linkLocation === "/") {
        isActive = location.pathname === props.linkLocation;
    } else {
        isActive = location.pathname.startsWith(props.linkLocation)
    }

    const ButtonIcon = props.icon;
    const typeButton = isActive ? 'primary' : 'secondary';
    const textClass = isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive";

    return (
        <Link className={`${styles.headerbutton} ${textClass} m-4`} to={props.linkLocation} >
            <ButtonIcon type={typeButton} />
            {props.title}
        </Link>
    );
};

export default AppHeaderLink;