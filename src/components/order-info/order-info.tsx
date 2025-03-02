import { memo, useEffect, useState } from 'react';
import { Price } from '../price/price'
import styles from './styles.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/store';
import { IngredientItemType, IOrderType } from '../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder } from './../../services/thunks/thunks'
import { fillIngredientsByIds } from './../../utils/utils'

function calculateTotalPrice(items: Array<IngredientItemType>) {
    return items.reduce((total, item) => total + item.price, 0);
}

export const OrderInfo = () => {
    const dispatch = useDispatch();
    const { isLoading, ingredients } = useSelector((state) => state.burgerIngredientsIngredient);

    const [localOrder, setLocalOrder] = useState<IOrderType | null>(null);
    const { orders: feedOrder } = useSelector((state) => state.Feed.feed);
    const { orders: feedProfileOrder } = useSelector((state) => state.FeedProfile.feed);

    const { orderIsLoading, fetchedOrder } = useSelector((state) => state.OrderInfo);
    const { number } = useParams();

    useEffect(() => {
        const findOrder = () => {
            if (localOrder !== null || isLoading || orderIsLoading || number === undefined) {
                return
            }

            const orderNumber = Number(number);
            if (localOrder !== null) return

            if (fetchedOrder !== null && orderNumber === fetchedOrder.number) {
                const filledIngredients = fillIngredientsByIds(fetchedOrder.ingredients, ingredients)
                setLocalOrder({ ...fetchedOrder, ingredientsFull: filledIngredients })
                return
            }

            let findOrder = feedOrder.find(item => item.number === orderNumber);
            if (findOrder !== undefined) {
                setLocalOrder(findOrder)
                return;
            }
            findOrder = feedProfileOrder.find(item => item.number === orderNumber);
            if (findOrder !== undefined) {
                setLocalOrder(findOrder)
                return
            }
            dispatch(getOrder(number))
        }
        findOrder()
    }, [fetchedOrder, dispatch, number, feedOrder, localOrder, isLoading, orderIsLoading, ingredients, feedProfileOrder])

    if (localOrder === null) {
        return (
            <div>Заказа не найден</div>
        )
    }

    const ingredientCounts = new Map<string, { item: IngredientItemType, count: number }>();
    const totalPrice = calculateTotalPrice(localOrder.ingredientsFull)

    localOrder.ingredientsFull.forEach(ingredient => {
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
            <p className="text text_type_main-medium mt-10 mb-3">{localOrder.name}</p>
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
                    <FormattedDate date={new Date(localOrder.updatedAt)}></FormattedDate>
                </div>
                <Price price={totalPrice} extra_class='text text_type_digits-default' />
            </div>
        </section>
    );
};

export default memo(OrderInfo);