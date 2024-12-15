import { FC } from 'react';
import Ingredient from "../../../utils/data"
import { Price } from "../../price"
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./styles.module.css"

type Props = {
    item: Ingredient,
}

export const BurgerIngredientsItem: FC<Props> = (props: Props): JSX.Element => {
    const count = Math.floor(Math.random() * (2));
    return (
        <ul className={`${styles.item} p-4 m-4}`}>
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
        </ul>
    )
}

export default BurgerIngredientsItem

//style={{ border: '1px solid rgb(192, 192, 76)' }}
