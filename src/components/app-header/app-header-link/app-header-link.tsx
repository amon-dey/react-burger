import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import { FC } from 'react';

type Props = {
    active: boolean,
    icon: FC<TIconProps>
    text: string
}

import styles from "./styles.module.css"
export const AppHeaderLink: React.FC<Props> = (props: React.PropsWithChildren<Props>): JSX.Element => {
    const ButtonIcon = props.icon;
    const typeButton = props.active ? 'primary' : 'secondary'
    const textClass = props.active ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"

    return (
        <a className={`${styles.headerbutton} ${textClass} m-4`} >
            <ButtonIcon type={typeButton} />
            {props.text}
        </a>
    )
}

export default AppHeaderLink


