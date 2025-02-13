import styles from './styles.module.css';
import { Price } from '../../price/price'
import { IngredientsImageList } from '../ingredients-list/ingredients-list'

export const OrderCard = () => {
    return (
        <section className={`${styles.ordercard} p-6 mb-6`}>
            <div className={`${styles.container} mb-6`}>
                <div className="text text_type_digits-default">#034535</div>
                <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20</div>
            </div>
            <p className="text text_type_main-medium mb-6">
                Death Star Starship Main бургер
            </p>
            <div className={`${styles.container}`}>
                <IngredientsImageList />
                <Price price={10} extra_class='text text_type_main-default'/>
            </div>
        </section>
    )
}

export default OrderCard