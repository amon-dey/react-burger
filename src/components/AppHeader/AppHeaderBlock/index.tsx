import { FC } from 'react';

type Props = {
    children: React.ReactNode
}

import styles from './styles.module.css';

export const AppHeaderBlock: FC<Props> = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (
        <div className={styles.headerblock}>
            {props.children}
        </div>
    )
}

export default AppHeaderBlock
