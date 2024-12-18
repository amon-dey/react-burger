import { FC, useState } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientItem from "../../../utils/types"
import { IngredientDetails } from "../../ingredient-details/ingredient-details"
import { Modal } from "../../modal/modal"
import styles from './styles.module.css';

type Props = {
    item: ingredientItem,
    cardType?: "top" | "bottom" | undefined,
}

export const BurgerConstructorCard: FC<Props> = (props: Props) => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    let text: string = props.item.name
    const dragVisible = props.cardType === undefined ? styles.default : styles.hidden;
    const isLocked = props.cardType !== undefined ? true : undefined
    if (props.cardType === "top") {
        text += "\n(верх)"
    }
    if (props.cardType === "bottom") {
        text += "\n(низ)"
    }

    return (
        <li className={`${styles.li} p-4 `} onClick={() => setShowModal(true)}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={props.cardType}
                text={text}
                thumbnail={props.item.image}
                price={props.item.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
            />
            {showModal && (
                <Modal closeModal={closeModal} showModal={showModal} headerText="Детали ингедиента">
                    <IngredientDetails item={props.item} />
                </Modal>
            )}
        </li>
    )
}

export default BurgerConstructorCard
