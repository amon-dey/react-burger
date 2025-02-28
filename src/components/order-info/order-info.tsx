import { memo } from 'react';
import { Price } from '../price/price'
import styles from './styles.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from '../../services/store';
import { IngredientItemType } from '../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function calculateTotalPrice(items: Array<IngredientItemType>) {
    return items.reduce((total, item) => total + item.price, 0);
}

export const OrderInfo = () => {
    const { orders } = useSelector((state) => state.Feed.feed);
    const { ingredients } = useSelector((state) => state.burgerIngredientsIngredient);

    const { number } = useParams()
    const orderNumber = Number(number);

    if (ingredients === null) {
        return null
    }

    const order = orders.find(item => item.number === orderNumber);
    if (order === undefined) {
        return (
            <div>not found</div>
        )
    }

    const ingredientCounts = new Map<string, { item: IngredientItemType, count: number }>();
    const totalPrice = calculateTotalPrice(order.ingredientsFull)

    order.ingredientsFull.forEach(ingredient => {
        if (ingredientCounts.has(ingredient._id)) {
            const { item, count } = ingredientCounts.get(ingredient._id)!;
            ingredientCounts.set(ingredient._id, { item, count: count + 1 });
        } else {
            ingredientCounts.set(ingredient._id, { item: ingredient, count: 1 });
        }
    });

    const uniqueIngredients = Array.from(ingredientCounts.values());

    return (
        <section className={`${styles.row} m-6`}>
            {/* <p className={`${styles.ordernumber} text text_type_digits-default`}>#{order.number}</p> */}
            <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
            <p className={`${styles.done} text text_type_main-default mb-15}`}>Выполнен</p>
            <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>
            <div className={styles.ingredientlist}>
                {uniqueIngredients.map((item, count) => (
                    <ul className={`${styles.container} mb-4 p-0`} key={item.item._id}>
                        <div className={styles.container}>
                            <div key={item.item._id} className={styles.ingredientWrapper} >
                                <div className={styles.ingredientInnerCircle}>
                                    <img className={styles.ingredientImage} src={item.item.image_mobile} alt={item.item.name} />
                                </div>
                            </div>
                            <span className={`${styles.ingredientname} pl-5 text text_type_main-default`}>{item.item.name}</span>
                        </div>
                        <div className={`${styles.ingredientprice} mr-4`}>
                            <span className="text text_type_digits-default p-2">
                                {count + 1} x {item.item.price}
                            </span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </ul>
                ))}
            </div>
            <div className={`${styles.container} mt-10`}>
                <div className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.updatedAt)}></FormattedDate>
                </div>
                <Price price={totalPrice} extra_class='text text_type_digits-default' />
            </div>
        </section>
    );
};

export default memo(OrderInfo);