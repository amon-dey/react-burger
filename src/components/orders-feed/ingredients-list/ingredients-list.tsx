import { Price } from '../../price/price'

import styles from './styles.module.css';
import { IngredientItemType } from './../../../utils/types'

type Props = {
    ingredients: Array<IngredientItemType>;
}

function calculateTotalPrice(items: Array<IngredientItemType>) {
    return items.reduce((total, item) => total + item.price, 0);
}

export const IngredientsImageList = (props: Props) => {
    
    const totalPrice = calculateTotalPrice(props.ingredients)
    const visibleItems = props.ingredients.slice(0, 5);
    const remainingCount = props.ingredients.length - visibleItems.length;

    return (
        <div className={styles.container}>
            <div className={styles.ingredientImagesContainer}>
                {visibleItems.map((item, index) => (
                    <div key={index} className={styles.ingredientWrapper} style={{ zIndex: props.ingredients.length - index }}>
                        <div className={styles.ingredientInnerCircle}>
                            <img className={styles.ingredientImage} src={item.image} alt={item.name} />
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div key="remaining" className={`${styles.ingredientWrapper} ${styles.darkened}`} style={{ zIndex: 1, position: 'relative' }}>
                        <div className={styles.ingredientInnerCircle}>
                            <img className={styles.ingredientImage} src={props.ingredients[5]?.image || ''} alt="Remaining items" />
                            <div className={styles.overlay}></div>
                        </div>
                        <div className={`${styles.remainingText} text text_type_main-small`}>+{remainingCount}</div>
                    </div>
                )}
            </div>
            <Price price={totalPrice} extra_class='text text_type_main-default' />
        </div>
    );
};