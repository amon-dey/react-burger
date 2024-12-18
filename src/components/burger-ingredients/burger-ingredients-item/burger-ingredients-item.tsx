import { useState } from 'react'
import { FC } from 'react';
import ingredientItem from "../../../utils/types"
import { Price } from "../../price/price"
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from "../../modal/modal"
import { IngredientDetails } from "../../ingredient-details/ingredient-details"
import styles from "./styles.module.css"

type Props = {
    item: ingredientItem,
}

export const BurgerIngredientsItem: FC<Props> = (props: Props): JSX.Element => {
    const count = Math.floor(Math.random() * (2));
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <ul className={`${styles.item} p-4 m-4}`} onClick={openModal}>
            <li>
                <img className="m-1" src={props.item.image} alt={props.item.name}></img>
            </li>
            <li className="m-1">
                <Price price={props.item.price} extra_class='text_type_main-default'></Price>
            </li>
            <li >
                <p className="text text_type_main-small">{props.item.name}</p>
            </li>
            {Boolean(count) && <Counter count={count} size="small"></Counter>}
            {showModal && (
                <Modal closeModal={closeModal} showModal={showModal} headerText="Детали ингедиента">
                    <IngredientDetails item={props.item} />
                </Modal>
            )
            }
        </ul>
    )
}

export default BurgerIngredientsItem

//style={{ border: '1px solid rgb(192, 192, 76)' }}
