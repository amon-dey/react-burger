import { memo } from 'react';
import styles from './styles.module.css';

export const OrderCard = () => {
    return (
        <section className={`${styles.ordercard} p-6`}>
            <div className={`${styles.container} mb-6`}>
                <div className="text text_type_digits-default">#034535</div>
                <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20</div>
            </div>
            <p className="text text_type_main-medium">
                Death Star Starship Main бургер
            </p>
        </section>
    )
}
//<p className="text text_type_digits-default">1234567890</p>

export const OrderList = () => {

    return (
        <section className={`${styles.row} m-6`}>
            <OrderCard />
        </section>
    );
};

export default memo(OrderList);