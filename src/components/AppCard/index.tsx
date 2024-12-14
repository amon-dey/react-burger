import { FC } from 'react';
import { PropsWithChildren, ReactNode } from 'react'
type Props = {
    children: ReactNode,
}

import styles from "./styles.module.css"
export const AppCard: FC<Props> = (props: PropsWithChildren<Props>) => {
    return (
        <div className={`${styles.maincard} p-4`}>
            {props.children}
        </div>
    )
}

export default AppCard