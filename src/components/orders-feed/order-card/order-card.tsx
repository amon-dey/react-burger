import styles from './styles.module.css';
import { IngredientsImageList } from '../ingredients-list/ingredients-list'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrderType } from '../../../utils/types';
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
    order: IOrderType
}

export const OrderCard = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation()
    const handleOnClick = () => {
        const to = location.pathname + "/" + props.order.number;
        navigate(to, { state: { from: location } });
    };

    let status: string
    let status_color: string = ""

    switch (props.order.status) {
        case 'done':
            status = "Выполнен"
            status_color = styles.done
            break;
        case 'created':
            status = "Создан"
            break;
        case 'pending':
            status = "Готовится"
            break;
    }

    return (
        <section className={`${styles.ordercard} p-6 mb-6`} onClick={handleOnClick}>
            <div className={`${styles.container} mb-6`}>
                <div className="text text_type_digits-default">#{props.order.number}</div>
                <div className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(props.order.updatedAt)}></FormattedDate>
                </div>
            </div>

            <p className="text text_type_main-medium">
                {props.order.name}
            </p>
            <p className={`${status_color} text text_type_main-default pt-1 mb-6`}>{status}</p>
            <IngredientsImageList ingredients={props.order.ingredientsFull} />
        </section>
    )
}

export default OrderCard