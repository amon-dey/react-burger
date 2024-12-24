import { FC, memo } from 'react';
import ingredientItem from "../../../utils/types";
import { Price } from "../../price/price";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { setSelected } from '../../../services/burger-ingredients/slice';
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from './../../../services/store';

type Props = {
    ingredient: ingredientItem,
};

export const BurgerIngredientsItem: FC<Props> = ({ ingredient: item }) => {
    const count = Math.floor(Math.random() * (2));
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClick = () => {
        dispatch(setSelected(item));
    }

    return (
        <ul className={`${styles.item} p-4 m-4}`} onClick={handleOnClick}>
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
        </ul>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(BurgerIngredientsItem)