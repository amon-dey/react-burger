import { FC } from 'react';
import ingredientItem from "../../../utils/types"
import { Price } from "../../price/price"
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from "../../modal/modal"
import { useModal } from "../../../hooks/useModal"
import { IngredientDetails } from "../../ingredient-details/ingredient-details"
import styles from "./styles.module.css"

type Props = {
    item: ingredientItem,
}

export const BurgerIngredientsItem: FC<Props> = ({ item }): JSX.Element => {
    const count = Math.floor(Math.random() * (2));

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <ul className={`${styles.item} p-4 m-4}`} onClick={openModal}>
            <li>
                <img className="m-1" src={item.image} alt={item.name}></img>
            </li>
            <li className="m-1">
                <Price price={item.price} extra_class='text_type_main-default'></Price>
            </li>
            <li >
                <p className="text text_type_main-small">{item.name}</p>
            </li>
            {Boolean(count) && <Counter count={count} size="small"></Counter>}
            {isModalOpen && (
                <Modal closeModal={closeModal} headerText="Детали ингедиента">
                    <IngredientDetails item={item} />
                </Modal>
            )
            }
        </ul>
    )
}

export default BurgerIngredientsItem
