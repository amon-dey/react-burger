import { FC } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

interface Props {
    className?: string;
    icon: string;
}

import vectorIcon1 from './../../../../images/order-details-v1.svg';
import vectorIcon2 from '../../../../images/order-details-v2.svg';
import vectorIcon3 from '../../../../images/order-details-v3.svg';

const Icon: FC<Props> = ({ className, icon }) => {
    return (
        <img className={className} src={icon}></img>
    );
};

export const OrderDetailsSuccessIcon = () => {
    return (
        <div className={`${styles.iconblock} m-15`}>
            <Icon className={styles.svgimg} icon={vectorIcon1} />
            <Icon className={styles.svgimg} icon={vectorIcon2} />
            <Icon className={styles.svgimg} icon={vectorIcon3} />
            <CheckMarkIcon type="primary" className={`${styles.icon}`} />
        </div>
    );
};
export default OrderDetailsSuccessIcon;