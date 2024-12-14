import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

type Props = {
    children: React.ReactNode,
    textStyle: string,
}

import styles from "./styles.module.css"
export const AppHeaderButton: React.FC<Props> = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (
        <div className={styles.headerbutton}>
            <Button htmlType="button" extraClass={`${styles.headerbutton} ${props.textStyle}`} >
                {props.children}
            </Button>
        </div>
    )
}

export default AppHeaderButton


