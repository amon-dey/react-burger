import { FC } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

/*
С иконкой надо какое-то колдуствао сделать            
*/
interface Props  {
    orderNumber?: number
}

export const OrderDetails: FC<Props> = ({orderNumber="99999"}) => {    
    return (
        <section className={`${styles.items} mt-5 mb-30 mr-30 ml-30`}>
            <p className={`${styles.textglow} text text_type_digits-large mb-2`}>{orderNumber}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <CheckMarkIcon type="primary" className={`${styles.icon} m-15`} />
            <p className="text text_type_main-default m-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </section>
    )
}
export default OrderDetails