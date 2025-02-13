import styles from './styles.module.css';

export const OrdersBoard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <div className={styles.done}>
                    <p className="text text_type_digits-default">034533</p>
                    <p className="text text_type_digits-default">034533</p>
                    <p className="text text_type_digits-default">034533</p>
                    <p className="text text_type_digits-default">034533</p>
                    <p className="text text_type_digits-default">034533</p>
                </div>

            </div>
            <div className={styles.column}>
                <p className="text text_type_main-medium mb-6">В работе</p>

                <p className="text text_type_digits-default">034533</p>
                <p className="text text_type_digits-default">034533</p>
                <p className="text text_type_digits-default">034533</p>
            </div>
        </div>
    );
};

export default OrdersBoard;