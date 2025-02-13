import burgerData from '../../../utils/data.json';
import styles from './styles.module.css';
import { Price } from '../../price/price'
export const IngredientsList = () => {

    return (
        <div className={styles.ingredientlist}>
            {burgerData.map((item, index) => (
                <div className={styles.container}>
                    <div className={styles.container}>
                        <div key={index} className={styles.ingredientWrapper} >

                            <div className={styles.ingredientInnerCircle}>
                                <img className={styles.ingredientImage} src={item.image} alt={item.name} />
                            </div>
                        </div>
                        <span className="ml-5 text text_type_main-default">{item.name}</span>
                    </div>
                    <Price price={10} />
                </div>
            ))}
        </div>
    );
};