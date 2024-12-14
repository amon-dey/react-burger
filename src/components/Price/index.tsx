import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './style.module.css';

type Props = {
    price: number
    extra_class: string
}

export const Price: FC<Props> = (props: Props) => {
    return (
        <div className={`${styles.price} mr-5`}>
            <span className={`${props.extra_class} text p-2`}>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
    )
}

export default Price
