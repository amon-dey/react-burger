import { FC, memo, useMemo } from 'react';
import IngredientItemType from "../../../utils/types";
import { Price } from "../../price/price";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./styles.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from './../../../services/store';
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
    ingredient: IngredientItemType,
};

export const BurgerIngredientsItem: FC<Props> = ({ ingredient: item }) => {
    const { bun, ingredients } = useSelector((state) => state.burgerConstructorIngredients);
    const navigate = useNavigate();
    const location = useLocation()

    const count = useMemo(() => {
        if (item.type === "bun" && bun) {
            if (item._id == bun._id) {
                return 2;
            }
        }
        if (ingredients.length > 0) {
            return ingredients.filter(ingredient => ingredient._id === item._id).length;
        } else {
            return 0;
        }
    }, [ingredients, item._id, item.type, bun]);

    const handleOnClick = () => {
        navigate("/ingredients/" + item._id, { state: { from: location, id: item._id }, });
    };

    const [, dragRef] = useDrag({
        type: item.type + "addingredient",
        item: { item }
    });

    return (
        <ul className={`${styles.item} p-4 m-4}`} onClick={handleOnClick} ref={dragRef}>
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

export default memo(BurgerIngredientsItem);