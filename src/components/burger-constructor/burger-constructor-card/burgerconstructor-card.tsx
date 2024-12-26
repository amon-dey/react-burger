import { FC, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItem } from "../../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient } from "../../../services/burger-constructor/burger-constructor-ingredients";
import { useDispatch } from 'react-redux';
import { AppDispatch } from './../../../services/store';
import { swapIngredient, hoverDropIndex } from "../../../services/burger-constructor/burger-constructor-ingredients";
import type { Identifier, XYCoord } from 'dnd-core'
import styles from './styles.module.css';

type Props = {
    ingredient: ingredientItem,
    cardType?: "top" | "bottom" | undefined,
    index: number
};

interface DragItem {
    index: number
    _id: string
}

export const BurgerConstructorCard: FC<Props> = ({ ingredient: ingredient, cardType: cardType, index: index }) => {
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<HTMLLIElement>(null);

    let bunLocationText: string = ingredient !== null ? ingredient.name : "";

    const dragVisible = cardType === undefined ? styles.default : styles.hidden;
    const isLocked = cardType !== undefined ? true : undefined;
    if (cardType === "top") {
        bunLocationText += "\n(верх)";
    }
    if (cardType === "bottom") {
        bunLocationText += "\n(низ)";
    }

    const [, dragRef] = useDrag({
        type: "lololo",
        item: { ingredient }
    });

    const [{ handlerId }, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: "lololo",
        collect(monitor) {
            return {
                //isHover: monitor.isOver({ shallow: true }),
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
            dispatch(hoverDropIndex(hoverIndex));
        },
        drop(item) {
            dispatch(swapIngredient(item));
        },
    })

    //const hoverClass = isHover.isHover ? styles.ishover : '';
    dragRef(dropRef(ref));

    const handleClose = () => {
        dispatch(removeIngredient(ingredient));
    };

    return (
        <li className={`${styles.li} p-4`} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" className={dragVisible} />
            <ConstructorElement
                type={cardType}
                text={bunLocationText}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={isLocked}
                extraClass={styles.nowrap}
                handleClose={handleClose}
            />
        </li>
    );
};

export default BurgerConstructorCard;
