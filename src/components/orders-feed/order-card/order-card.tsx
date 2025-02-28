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
        navigate("/feed/" + props.order.number, { state: { from: location } })
    };

    return (
        <section className={`${styles.ordercard} p-6 mb-6`} onClick={handleOnClick}>
            <div className={`${styles.container} mb-6`}>
                <div className="text text_type_digits-default">#{props.order.number}</div>
                <div className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(props.order.updatedAt)}></FormattedDate>
                </div>
            </div>
            <p className="text text_type_main-medium mb-6">
                {props.order.name}
            </p>
            <IngredientsImageList ingredients={props.order.ingredientsFull} />
        </section>
    )
}

export default OrderCard