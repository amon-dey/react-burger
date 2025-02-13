import { memo } from 'react';
import { Price } from '../price/price'
import styles from './styles.module.css';
import { IngredientsList } from './ingredients-list/ingredients-list'

export const OrderInfo = () => {

    return (
        <section className={`${styles.row} m-6`}>
            <p className={`${styles.ordernumber} text text_type_main-default`}>#034533</p>
            <p className="text text_type_main-medium mt-10 mb-3">Black Hole Singularity острый бургер</p>
            <p className={`${styles.done} text text_type_main-default mb-15}`}>Выполнен</p>
            <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>
            <IngredientsList />
            <div className={`${styles.container} mt-10`}>
                <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20</div>
                <Price price={324} extra_class='text text_type_main-default' />
            </div>
        </section>
    );
};

export default memo(OrderInfo);