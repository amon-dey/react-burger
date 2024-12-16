import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import { FC } from 'react';

type Props = {
    active: boolean,
    icon: FC<TIconProps>
    text: string
}

import styles from "./styles.module.css"
export const AppHeaderButton: React.FC<Props> = (props: React.PropsWithChildren<Props>): JSX.Element => {
    const ButtonIcon = props.icon;
    const typeButton = props.active ? 'primary' : 'secondary'
    const textClass = props.active ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"

    return (
        <div className={styles.headerbutton}>
            <Button htmlType="button" extraClass={`${styles.headerbutton} ${textClass}`} >
                <ButtonIcon type={typeButton} />
                {props.text}
            </Button>
        </div>
    )
}

export default AppHeaderButton


