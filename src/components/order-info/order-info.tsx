import { memo } from 'react';
import { Price } from '../price/price'
import styles from './styles.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from '../../services/store';
import { IngredientItemType } from '../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function getIngredientsByIds(list1: string[], list2: Array<IngredientItemType>): Array<IngredientItemType> {
    const ingredientMap = new Map<string, IngredientItemType>();

    list2.forEach(item => {
        ingredientMap.set(item._id, item);
    });

    const result: Array<IngredientItemType> = [];

    list1.forEach(id => {
        if (ingredientMap.has(id)) {
            result.push(ingredientMap.get(id)!);
        }
    });

    return result;
}

function calculateTotalPrice(items: Array<IngredientItemType>) {
    return items.reduce((total, item) => total + item.price, 0);
}

export const OrderInfo = () => {
    const { orders } = useSelector((state) => state.Feed.feed);
    const { ingredients } = useSelector((state) => state.burgerIngredientsIngredient);

    const { id } = useParams();

    if (ingredients === null) {
        return null
    }

    const order = orders.find(item => item._id === id);
    if (order === undefined) {
        return (
            <div>not found</div>
        )
    }

    const orderIngredients = getIngredientsByIds(order.ingredients, ingredients);
    const ingredientCounts = new Map<string, { item: IngredientItemType, count: number }>();

    orderIngredients.forEach(ingredient => {
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
            <p className={`${styles.ordernumber} text text_type_main-default`}>#{order.number}</p>
            <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
            <p className={`${styles.done} text text_type_main-default mb-15}`}>Выполнен</p>
            <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>
            <div className={styles.ingredientlist}>
                {uniqueIngredients.map((item, count) => (
                    <div className={styles.container}>
                        <div className={styles.container}>
                            <div key={item.item._id} className={styles.ingredientWrapper} >
                                <div className={styles.ingredientInnerCircle}>
                                    <img className={styles.ingredientImage} src={item.item.image_mobile} alt={item.item.name} />
                                </div>
                            </div>
                            <span className="ml-5 text text_type_main-default">{item.item.name}</span>
                        </div>
                        <div className={`${styles.price} mr-5`}>
                            <span className="text text_type_digits-default p-2">
                                {count + 1} x {calculateTotalPrice(orderIngredients)}
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.container} mt-10`}>
                <div className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.updatedAt)}></FormattedDate>
                </div>
                <Price price={calculateTotalPrice(orderIngredients)} extra_class='text text_type_main-default' />
            </div>
        </section>
    );
};

export default memo(OrderInfo);