import burgerData from '../../../utils/data.json';
import styles from './styles.module.css';

export const IngredientsImageList = () => {
    const visibleItems = burgerData.slice(0, 5);
    const remainingCount = burgerData.length - visibleItems.length;

    return (
        <div className={styles.ingredientImagesContainer}>
            {visibleItems.map((item, index) => (
                <div key={index} className={styles.ingredientWrapper} style={{ zIndex: burgerData.length - index }}>
                    <div className={styles.ingredientInnerCircle}>
                        <img className={styles.ingredientImage} src={item.image} alt={item.name} />
                    </div>
                </div>
            ))}
            {remainingCount > 0 && (
                <div key="remaining" className={`${styles.ingredientWrapper} ${styles.darkened}`} style={{ zIndex: 1, position: 'relative' }}>
                    <div className={styles.ingredientInnerCircle}>
                        <img className={styles.ingredientImage} src={burgerData[5]?.image || ''} alt="Remaining items" />
                        <div className={styles.overlay}></div>
                    </div>
                    <div className={`${styles.remainingText} text text_type_main-small`}>+{remainingCount}</div>
                </div>
            )}
        </div>
    );
};