import { Price } from '../../price/price'

import styles from './styles.module.css';
import { IngredientItemType } from './../../../utils/types'
import { useSelector } from '../../../services/store';

type Props = {
    ingredients: Array<string>;
}

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

export const IngredientsImageList = (props: Props) => {
    const { ingredients } = useSelector((state) => state.burgerIngredientsIngredient);
    if (ingredients === null) {
        return null
    }
    const orderIngredients = getIngredientsByIds(props.ingredients, ingredients);
    const visibleItems = orderIngredients.slice(0, 5);
    const remainingCount = orderIngredients.length - visibleItems.length;

    return (
        <div className={styles.container}>
            <div className={styles.ingredientImagesContainer}>
                {visibleItems.map((item, index) => (
                    <div key={index} className={styles.ingredientWrapper} style={{ zIndex: orderIngredients.length - index }}>
                        <div className={styles.ingredientInnerCircle}>
                            <img className={styles.ingredientImage} src={item.image} alt={item.name} />
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div key="remaining" className={`${styles.ingredientWrapper} ${styles.darkened}`} style={{ zIndex: 1, position: 'relative' }}>
                        <div className={styles.ingredientInnerCircle}>
                            <img className={styles.ingredientImage} src={orderIngredients[5]?.image || ''} alt="Remaining items" />
                            <div className={styles.overlay}></div>
                        </div>
                        <div className={`${styles.remainingText} text text_type_main-small`}>+{remainingCount}</div>
                    </div>
                )}
            </div>
            <Price price={calculateTotalPrice(orderIngredients)} extra_class='text text_type_main-default' />
        </div>
    );
};